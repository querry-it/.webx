import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/.webx/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    allowedHosts: ['.trycloudflare.com'],
  },
  build: {
    outDir: 'dist',
  },
});
