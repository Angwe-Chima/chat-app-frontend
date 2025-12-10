import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/chat-app/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://chat-app-backend-cd4s.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
