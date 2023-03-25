import type { Page } from 'type/nuxt-content-type'

export const getPageMeta = (page: Page, name: string) =>
  page.head.meta.find((o: any) => o.name === name || o.property === name)

export const getPageDate = (page: Page) => {
  const date = getPageMeta(page, 'article:published_time')?.content
  return date ? new Date(date) : undefined
}
