// Maps each product's photo folder (under src/assets) to the image URLs Vite emits for it.
const modules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function imagesForFolder(...folders: string[]): string[] {
  const prefixes = folders.map((folder) => `../assets/${folder}/`);
  return Object.keys(modules)
    .filter((path) =>
      prefixes.some((prefix) => path.startsWith(prefix)) &&
      !path.includes("/__MACOSX/") &&
      !path.split("/").pop()!.startsWith("._"),
    )
    .sort()
    .map((path) => modules[path]);
}

// Loose match: URL-decode (dev-mode URLs percent-encode spaces etc. — left
// undecoded, "%20" leaks its digits into the normalized string), lowercase,
// alphanumeric only. Production builds also rewrite commas/spaces/etc. in
// hashed filenames, so exact-string matching between a hint and a built
// asset URL isn't reliable — this is.
function normalize(s: string): string {
  let decoded = s;
  try {
    decoded = decodeURIComponent(s);
  } catch {
    // malformed escape sequence — fall back to the raw string
  }
  return decoded.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// Production builds append an 8-char content hash before the extension
// (e.g. "Dry-Senna-jW4g1sZS.webp") — strip that plus the extension so exact
// matching works the same in dev and prod. Falls back to just stripping the
// extension when there's no hash (dev mode serves the original filename).
function stripBuildArtifacts(basename: string): string {
  return basename
    .replace(/-[A-Za-z0-9_-]{8}\.[a-z0-9]+$/i, "")
    .replace(/\.[a-z0-9]+$/i, "");
}

// Reorders `images` so the one whose filename matches `filenameHint` is first
// (used as the product's main/thumbnail photo). Matches against the basename
// only, since folder names can otherwise cause false matches.
export function withPrimary(images: string[], filenameHint: string): string[] {
  const hint = normalize(filenameHint);
  const basenameOf = (url: string) => url.split("/").pop() ?? "";

  // Prefer an exact match over a loose substring match — some filenames are
  // prefixes of others, e.g. "Dry-Senna.webp" vs "Dry-Senna-Leaves.webp", so
  // "includes" alone picks the wrong one.
  let idx = images.findIndex((url) => normalize(stripBuildArtifacts(basenameOf(url))) === hint);
  if (idx === -1) {
    idx = images.findIndex((url) => normalize(basenameOf(url)).includes(hint));
  }
  if (idx <= 0) return images;
  const reordered = [...images];
  const [primary] = reordered.splice(idx, 1);
  reordered.unshift(primary);
  return reordered;
}
