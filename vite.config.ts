import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/konark/",
  plugins: [react()],
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/konark/",   // <-- ADD THIS LINE
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
