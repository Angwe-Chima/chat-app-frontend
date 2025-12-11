import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/chat-app-frontend/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://chat-app-backend-u08y.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
