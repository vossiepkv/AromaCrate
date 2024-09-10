import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Ensure the base path is relative
  build: {
    outDir: 'dist', // Make sure output directory is correctly configured
  }
})
