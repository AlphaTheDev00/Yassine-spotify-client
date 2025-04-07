import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
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
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: "http://localhost:8888",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/.netlify/functions/api"),
        },
        "/auth": {
          target: "http://localhost:8888",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, "/.netlify/functions/api/auth"),
        },
      },
    },
    preview: {
      port: 5173,
      strictPort: true,
    },
  };
});
