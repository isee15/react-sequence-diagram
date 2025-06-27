import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "demo"),
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: resolve(__dirname, "postcss.config.js"),
  },
  build: {
    outDir: resolve(__dirname, "demo-dist"),
  },
});
