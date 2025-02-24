// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';
import robotsTxt from 'astro-robots-txt';


import netlify from '@astrojs/netlify';


import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site: 'https://rumahku.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    vue(), 
    sitemap({
      filter: (page) => !/\/404/.test(page), // Filter halaman 404
      changefreq: 'weekly',
      priority: 0.8,
    }),
    robotsTxt({
      sitemap: true, // Secara otomatis menambahkan link ke sitemap di robots.txt
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin'], // Contoh halaman yang tidak diindeks
        },
      ],
    }), 
  ],
  
  adapter: netlify()
});