import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/assessment-tdcx",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //this command is to create an alias for src path
    }
  }
});
