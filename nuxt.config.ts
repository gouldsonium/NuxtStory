// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
        region: "eu"
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
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com'
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
