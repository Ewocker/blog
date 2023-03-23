import tailwindTypography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    documentDriven: true,
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
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
                // remove backtick for code element
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
