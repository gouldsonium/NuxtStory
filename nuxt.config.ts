// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/router.scrollBehavior', mode: 'client' }],
  runtimeConfig: {
    public: {
      VERSION: process.env.STORYBLOK_VERSION
    }
  },
  site: {
    url: process.env.WEBSITE_URL,
    name: process.env.WEBSITE_NAME
  },
  modules: [
    '@nuxtjs/tailwindcss',
    ["@storyblok/nuxt", { 
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      apiOptions: {
        region: process.env.STORYBLOK_REGION || 'eu'
      } 
    }],
    '@nuxt/image',
    'nuxt-simple-robots',
    !!process.env.GTAG_ID ?
    ['nuxt-gtag', {
      id: process.env.GTAG_ID,
      config: {
        page_title: process.env.WEBSITE_NAME
      }
    }] : null,
    'nuxt-aos'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  image: {
    storyblok: {
      baseURL: !!process.env.STORYBLOK_REGION 
      ? `https://a-${process.env.STORYBLOK_REGION}.storyblok.com` : 'https://a.storyblok.com'
    },
    dir: 'assets/img'
  },
  css: ['assets/css/main.css'],
  devtools: { enabled: true },
  app:{
    pageTransition: {name: 'page', mode: 'out-in'},
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: process.env.FONT_URL },
        { rel: "stylesheet", href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css'}
      ],
      meta: [
        { name:"msapplication-TileColor", content:"#00aba9"},
        { name:"theme-color", content:"#ffffff" }
      ]
    }
  },
  experimental: {
    componentIslands: true,
    payloadExtraction: true
  }
})
