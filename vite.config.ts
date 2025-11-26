import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
  plugins: [react(), RubyPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
      "@src": path.resolve(__dirname, "./app/frontend/src"),
      "@ui": path.resolve(__dirname, "./app/frontend/src/components/ui"),
      "@components": path.resolve(__dirname, "./app/frontend/src/components"),
    },
  },
  server: {
    // AIDEV-NOTE: Fix WebSocket connection - use localhost instead of 127.0.0.1
    host: "localhost",
    hmr: {
      host: "localhost",
    },
  },
});
