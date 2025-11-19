import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/AI_Tutorial_For_Everyone',
  build: {
    assets: 'assets'
  },
  compressHTML: true,
  trailingSlash: 'ignore'
});
