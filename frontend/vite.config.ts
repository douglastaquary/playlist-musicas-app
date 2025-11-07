import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Para GitHub Pages, defina GH_PAGES=true ao buildar
// e ajuste o base para o nome do repositório.
const isGhPages = process.env.GH_PAGES === 'true';
const repoBase = '/playlist-musicas-webapp/';

export default defineConfig({
  plugins: [react()],
  base: isGhPages ? repoBase : '/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'playlist-musicas-app-production.up.railway.app',
        changeOrigin: true,
      },
    },
  },
});

