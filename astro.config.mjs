// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';
import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rumahku.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue(), sitemap({
    filter: (page) => !/\/404/.test(page), // Filter halaman 404
    changefreq: 'weekly',
    priority: 0.8,
  }), robotsTxt({
    sitemap: true, // Secara otomatis menambahkan link ke sitemap di robots.txt
    policy: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'], // Contoh halaman yang tidak diindeks
      },
    ],
  }), db()],
  
  adapter: netlify()
});