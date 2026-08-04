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

// Loose match: lowercase, alphanumeric only. Production builds rewrite
// commas/spaces/etc. in hashed filenames, so exact-string matching between
// a hint and a built asset URL isn't reliable — this is.
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

// Reorders `images` so the one whose filename matches `filenameHint` is first
// (used as the product's main/thumbnail photo). Matches against the basename
// only, since folder names can otherwise cause false matches.
export function withPrimary(images: string[], filenameHint: string): string[] {
  const hint = normalize(filenameHint);
  const idx = images.findIndex((url) => {
    const basename = url.split("/").pop() ?? "";
    return normalize(basename).includes(hint);
  });
  if (idx <= 0) return images;
  const reordered = [...images];
  const [primary] = reordered.splice(idx, 1);
  reordered.unshift(primary);
  return reordered;
}
