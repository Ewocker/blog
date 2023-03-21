import type { Page } from 'type/nuxt-content-type'

export const getPageMeta = (page: Page, name: string) =>
  page.head.meta.find((o: any) => o.name === name)

export const getPageKeywords = (page: Page) =>
  getPageMeta(page, 'keywords')
    ?.content.split(',')
    .map((o) => o.trim())
