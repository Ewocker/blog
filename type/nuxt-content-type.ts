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

export interface Page {
  _path: string
  _dir: string
  _draft: boolean
  _partial: boolean
  _locale: string
  _empty: boolean
  navigation: boolean
  title: string
  series: string
  description: string
  keywords: Array<string>
  layout: string
  image: {
    src: string
    alt: string
  }
  head: {
    meta: Meta[]
  }
  body: {
    type: string
    children: Link[]
    toc: Toc
  }
  _type: string
  _id: string
  _source: string
  _file: string
  _extension: string
}
