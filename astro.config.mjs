import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert'

const env = loadEnv('', process.cwd(), 'STORYBLOK');
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  '',
);

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: 'eu',
      },
      components: {
        page: "/storyblok/Page",
        hero: "/components/Hero", 
      },
    }),
  ],
  output: 'server',
  vite: {
    plugins: [ mkcert() ]
  },
});