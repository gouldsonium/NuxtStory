// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    ["@storyblok/nuxt", { 
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      apiOptions: {
        region: "eu"
      } 
    }]
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  css: ['assets/css/main.css'],
  devtools: { enabled: true }
})
