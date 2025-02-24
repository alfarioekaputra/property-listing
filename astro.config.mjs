// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import robotsTxt from 'astro-robots-txt';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  site: 'https://rumahku.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue(), robotsTxt()],
  
  adapter: netlify()
});