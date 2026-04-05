import redirect from './data/redirect'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui'],

  css: [
    '~/assets/css/main.css',
    '~/assets/fonts/cyly/cyly.css', // font
  ],

  content: {},

  routeRules: redirect,

  compatibilityDate: '2024-10-15',
})