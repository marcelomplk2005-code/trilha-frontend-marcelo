/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom simula um navegador invisível no terminal para testar HTML
    environment: "jsdom", 
  },
});