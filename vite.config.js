import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find all HTML files in src and src/blog
const htmlFiles = glob.sync('src/**/*.html').reduce((acc, file) => {
  const name = file.replace('src/', '').replace('.html', '').replace(/\//g, '-');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlFiles,
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
