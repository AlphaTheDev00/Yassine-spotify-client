import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://musicfy-clone.netlify.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/.netlify/functions/api"),
      },
      "/auth": "http://localhost:8888/.netlify/functions/api", // Add this line
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
});
