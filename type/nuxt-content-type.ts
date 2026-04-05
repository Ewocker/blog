export interface Link {
  id: string
  depth: number
  text: string
  children?: Link[]
}

export interface Toc {
  title: string
  searchDepth: number
  depth: number
  links: Link[]
}

export interface Meta {
  name: string
  property: string
  content: string
}

/**
 * Page type for @nuxt/content v3
 * Standard fields are top-level, custom frontmatter fields are also top-level
 * thanks to the collection schema definition.
 */
export interface Page {
  // v3 standard fields
  id: string
  path: string
  stem: string
  extension: string
  title: string
  description: string
  body: any
  seo: {
    title?: string
    description?: string
    [key: string]: unknown
  }
  navigation?: boolean

  // Custom fields from collection schema
  layout: string
  series: string
  featured: boolean
  keywords: Array<string>
  image: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  head: {
    meta: Meta[]
  }
  meta: Record<string, unknown>

  // v2 compat aliases (deprecated, for gradual migration)
  /** @deprecated Use `id` */
  _id?: string
  /** @deprecated Use `path` */
  _path?: string
  /** @deprecated Use `stem` + `extension` */
  _file?: string
}
