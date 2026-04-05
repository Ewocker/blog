import redirect from './data/redirect'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui'],

  css: [
    '~/assets/fonts/cyly/cyly.css', // font
  ],

  content: {},

  routeRules: redirect,

  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  compatibilityDate: '2024-10-15',
})