// Maps each product's photo folder (under src/assets) to the image URLs Vite emits for it.
const modules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function imagesForFolder(folder: string): string[] {
  const prefix = `../assets/${folder}/`;
  return Object.keys(modules)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => modules[path]);
}
