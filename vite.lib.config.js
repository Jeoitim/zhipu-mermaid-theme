import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/zhipu-mermaid-theme.js"),
      formats: ["es"],
      fileName: "zhipu-mermaid-theme",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: ["mermaid"],
    },
  },
});
