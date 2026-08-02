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
