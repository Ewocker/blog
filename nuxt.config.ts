import tailwindTypography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    documentDriven: true,
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
      // theme: {
      //   extend: {
      //     colors: {
      //       primary: defaultTheme.colors.green,
      //     },
      //   },
      // },
    },
  },
})
