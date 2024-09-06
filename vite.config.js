import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        product: './product.html',
        contact: './contact.html',
        about: './about.html',
        account: './account.html'
      }
    }
  }
});
