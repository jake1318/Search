import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This allows you to use variables and mixins across all SCSS files
        additionalData: `
          @import "./src/styles/abstracts/_variables.scss";
          @import "./src/styles/abstracts/_mixins.scss";
        `,
      },
    },
    // Add source maps for better debugging
    devSourcemap: true,
  },
});
