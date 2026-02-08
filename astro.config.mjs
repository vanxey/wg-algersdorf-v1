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
        // navbar: "components/Navbar.astro",
        page: "storyblok/Page.astro",
        hero: "components/Hero.astro", 
        textArea: "components/TextArea.astro",
        sliderArea: "components/SliderArea.astro",
        sliderArea_v2: "components/SliderArea_v2.astro",
        aboutArea1: "components/AboutArea_1.astro",
        aboutArea2: "components/AboutArea_2.astro",
        aboutArea3: "components/AboutArea_3.astro",
        quote: "components/Quote.astro",
        widget: "components/ui/Widget.astro",
        widgetArea: "components/WidgetArea.astro",
      },
    }),
  ],
  output: 'server',
  vite: {
    plugins: [ mkcert() ]
  },
});