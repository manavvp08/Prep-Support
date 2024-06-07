import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { vitePluginPWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
