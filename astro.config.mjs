// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://koreal6803.github.io',
  base: '/forest-school-website',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true
    }
  }
});