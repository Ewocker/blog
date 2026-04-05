import redirect from './data/redirect'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui'],

  css: [
    '~/assets/fonts/cyly/cyly.css', // font
  ],

  content: {
    documentDriven: {
      // FOR SEO meta tag or:url
      host: 'https://blog.ewocker.com',
    },
  },

  routeRules: redirect,

  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  compatibilityDate: '2024-10-15',
})