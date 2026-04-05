import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        layout: z.string().optional(),
        series: z.string().optional(),
        featured: z.boolean().optional(),
        keywords: z.array(z.string()).optional(),
        image: z.object({
          src: z.string(),
          alt: z.string().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
        }).optional(),
        navigation: z.boolean().optional(),
        head: z.object({
          meta: z.array(z.object({
            name: z.string().optional(),
            property: z.string().optional(),
            content: z.string().optional(),
          })).optional(),
        }).optional(),
      }),
    }),
  },
})
