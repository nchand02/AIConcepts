import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nchand02.github.io',
  base: '/AIConcepts',
  build: {
    assets: 'assets'
  },
  compressHTML: true,
  trailingSlash: 'ignore'
});
