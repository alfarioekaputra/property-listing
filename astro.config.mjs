// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import robotsTxt from 'astro-robots-txt';


// https://astro.build/config
export default defineConfig({
  site: 'https://listing-rumah.vercel.app/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue(), robotsTxt()]
});