import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        portfolio: resolve(__dirname, 'src/portfolio.html'),
        blog: resolve(__dirname, 'src/blog.html'),
        about: resolve(__dirname, 'src/about.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        'post-template': resolve(__dirname, 'src/post-template.html'),
      },
    },
  },
  publicDir: '../public',
  server: {
    open: true,
    port: 3000,
  },
  css: {
    postcss: './postcss.config.js',
  },
});