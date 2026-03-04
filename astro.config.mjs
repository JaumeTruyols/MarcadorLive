import { defineConfig } from 'astro/config';
import react    from '@astrojs/react';
import vercel   from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE ?? 'https://marcador.live', // cambia por tu dominio real
  output: 'server',          // SSR — páginas generadas en el servidor en cada petición
  adapter: vercel(),         // ← adaptador para desplegar en Vercel
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
