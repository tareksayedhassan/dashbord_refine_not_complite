import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path"; // إضافة مكتبة path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // تعريف alias لمجلد src
    },
  },
});
