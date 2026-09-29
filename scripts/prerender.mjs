// Post-build step: renders each public route in a real (headless) browser and
// writes the fully-rendered HTML as a static snapshot into dist/, so crawlers
// that don't execute JavaScript (OpenAI's OAI-SearchBot / OAI-AdsBot / GPTBot,
// social-media link previews, etc.) see real content instead of the empty
// `<div id="root"></div>` shell.
//
// Real browsers are unaffected: index.html still loads the same JS bundle,
// which mounts with `createRoot` and immediately re-renders over the
// snapshot, so nothing changes for human visitors.
//
// Vercel's `vercel.json` uses `{ "handle": "filesystem" }` before its SPA
// catch-all rewrite, so a literal file like dist/products/index.html is
// served for that exact path instead of falling through to the rewrite.
//
// Ref: https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// Vercel's build container is missing several shared libraries
// (libnspr4.so, libnss3.so, ...) that regular puppeteer's bundled Chromium
// needs, so it fails with "error while loading shared libraries" there.
// @sparticuz/chromium ships a build made for exactly this kind of
// restricted Linux container. Use it (via puppeteer-core, which doesn't
// bundle its own browser) when running on Vercel; use plain `puppeteer`'s
// own downloaded Chromium for local dev builds.
// Ref: https://github.com/Sparticuz/chromium
const isVercel = Boolean(process.env.VERCEL);

async function launchBrowser() {
  if (isVercel) {
    const { default: chromium } = await import("@sparticuz/chromium");
    const { default: puppeteerCore } = await import("puppeteer-core");
    return puppeteerCore.launch({
      executablePath: await chromium.executablePath(),
      args: await puppeteerCore.defaultArgs({
        args: chromium.args,
        headless: "shell",
      }),
      defaultViewport: { width: 1280, height: 800 },
      headless: "shell",
    });
  }
  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.join(rootDir, "dist");

const routes = [
  "/",
  "/products",
  "/about",
  "/contact",
  "/privacy",
  "/returns",
  ...(await getProductRoutes()),
];

async function getProductRoutes() {
  const src = await readFile(
    path.join(rootDir, "src", "data", "products.ts"),
    "utf8",
  );
  const ids = [...src.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map((m) => m[1]);
  if (ids.length === 0) {
    throw new Error(
      "prerender: found no product ids in src/data/products.ts - regex may need updating",
    );
  }
  return ids.map((id) => `/products/${id}`);
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

// Minimal static file server with SPA fallback to index.html, matching how
// Vercel serves this build (filesystem first, then catch-all to index.html).
function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split("?")[0]);
        let filePath = path.join(distDir, urlPath);
        if (urlPath === "/" || !path.extname(filePath)) {
          filePath = path.join(distDir, urlPath, "index.html");
          if (!existsSync(filePath)) {
            filePath = path.join(distDir, "index.html");
          }
        }
        if (!existsSync(filePath)) {
          filePath = path.join(distDir, "index.html");
        }
        const ext = path.extname(filePath);
        const body = await readFile(filePath);
        res.writeHead(200, {
          "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
        });
        res.end(body);
      } catch (err) {
        res.writeHead(500);
        res.end(String(err));
      }
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  if (!existsSync(distDir)) {
    throw new Error(`prerender: dist/ not found at ${distDir} - run vite build first`);
  }

  const server = await startStaticServer();
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await launchBrowser();

  console.log(
    `\nPrerendering ${routes.length} route(s) for crawler visibility (${
      isVercel ? "@sparticuz/chromium" : "local puppeteer"
    })...`,
  );

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await page.goto(`${baseUrl}${route}`, {
          waitUntil: "networkidle2",
          timeout: 30000,
        });
        // Give React a moment past network-idle to finish committing render.
        await page.waitForSelector("#root", { timeout: 10000 });
        await page.waitForFunction(
          () => document.getElementById("root")?.childElementCount > 0,
          { timeout: 10000 },
        );

        const html = await page.content();
        const outDir =
          route === "/" ? distDir : path.join(distDir, route.slice(1));
        await mkdir(outDir, { recursive: true });
        await writeFile(path.join(outDir, "index.html"), html, "utf8");
        console.log(`  ✓ ${route}`);
      } catch (err) {
        console.error(`  ✗ ${route}: ${err.message}`);
        process.exitCode = 1;
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (process.exitCode === 1) {
    throw new Error("prerender: one or more routes failed to render (see above)");
  }
  console.log("Prerendering complete.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
