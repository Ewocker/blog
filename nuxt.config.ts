import tailwindTypography from '@tailwindcss/typography'
import tailwindLineClamp from '@tailwindcss/line-clamp'
import redirect from './data/redirect'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    documentDriven: {
      // FOR SEO meta tag or:url
      host: 'https://blog.ewocker.com',
    },
  },
  routeRules: redirect,
  tailwindcss: {
    config: {
      plugins: [tailwindTypography, tailwindLineClamp],
      theme: {
        extend: {
          typography: ({ theme }) => ({
            DEFAULT: {
              css: {
                // remove underline
                a: {
                  color: '#364f87',
                  'text-decoration': 'none',
                  '&:hover': {
                    color: '#10234f',
                    'text-decoration': 'underline',
                  },
                },
                code: {
                  backgroundColor: theme('colors.slate.200'),
                  borderRadius: theme('borderRadius.sm'),
                  paddingTop: theme('padding[1]'),
                  paddingRight: theme('padding[1.5]'),
                  paddingBottom: theme('padding[1]'),
                  paddingLeft: theme('padding[1.5]'),
                },
                'code::before': {
                  content: 'normal',
                },
                'code::after': {
                  content: 'normal',
                },
              },
            },
          }),
        },
      },
    },
  },
})
