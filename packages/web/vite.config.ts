// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import eslint from 'vite-plugin-eslint';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const ASSET_URL = process.env.ASSET_URL || '';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    eslint(),
  ],
  define: {
    'process.env': {
      ASSET_URL: ASSET_URL,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
  },
  base: ASSET_URL,
});
