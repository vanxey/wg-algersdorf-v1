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

        detailedTopicSection: "components/about/DetailedTopicSection.astro",
        imageSlider: "components/about/ImageSlider.astro",
        numbersSection: "components/about/NumbersSection.astro",
        questionsAnswersSection: "components/about/QuestionsAnswersSection.astro",
        socialMedia: "components/about/SocialMedia.astro",

        callToActionSection: "components/all/CallToActionSection.astro",
        contactSection: "components/all/ContactSection.astro",
        footer: "components/all/Footer.astro",
        hero2: "components/all/Hero2.astro", 
        navbar: "components/all/Navbar.astro", 

        communitySection: "components/community/CommunitySection.astro",

        aboutArea1: "components/home/AboutArea_1.astro",
        aboutArea2: "components/home/AboutArea_2.astro",
        aboutArea3: "components/home/AboutArea_3.astro",
        hero: "components/home/Hero.astro", 
        quote: "components/home/Quote.astro",
        // sliderArea: "components/home/SliderArea.astro",
        sliderArea_v2: "components/home/SliderArea_v2.astro",
        textArea: "components/home/TextArea.astro",
        textSection: "components/home/TextSection.astro",
        textSectionRegular: "components/home/TextSectionRegular.astro",
        widgetArea: "components/home/WidgetArea.astro",
        widgetGrid: "components/home/WidgetGrid.astro",
        teamArea: "components/home/TeamArea.astro",

        impressum: "components/legal/Impressum.astro",

        teamSection: "components/team/TeamSection.astro",
        
        detailedTopicWidget: "components/ui/DetailedTopicWidget.astro",
        personWidget: "components/ui/PersonWidget.astro",
        topicWidget: "components/ui/TopicWidget.astro",
        qnaWidget: "components/ui/QnaWidget.astro",
        stripe: "components/ui/Stripe.astro",
        socialMediaIcon: "components/ui/SocialMediaIcons.astro",
        navDropdown: "components/ui/NavDropDown.astro",
        navLink: "components/ui/NavLink.astro",
       
      },
    }),
  ],
  output: 'server',
  vite: {
    plugins: [ mkcert() ]
  },
});