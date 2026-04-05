<script setup lang="ts">
import authors from '~/components/BlogAuthor/data'
import { getPageMeta, getPageDate } from '~/utils/nuxt-content'
import { computeImageSrc } from '~/utils/image'

const route = useRoute()
const page = inject<Ref<any>>('content-page')!

const authorName = computed(() => getPageMeta(page.value, 'author')?.content || '小貓貓工程師')
const author = computed(() => authors.get(authorName.value))
const date = computed(() => getPageDate(page.value))
const read = computed(() => getPageMeta(page.value, 'read')?.content)
const keywords = computed(() => page.value?.keywords)
const series = computed(() => page.value?.series)
const hero = computed(() => page.value?.image)
const heroSrc = computed(computeImageSrc(page.value?.image?.src, route.path))

// Get prev/next from surroundings
const { data: surround } = await useAsyncData(`surround-${route.path}`, () =>
  queryCollectionItemSurroundings('content', route.path, {
    before: 1,
    after: 1,
  })
)
const prev = computed(() => surround.value?.[0] || null)
const next = computed(() => surround.value?.[1] || null)

// Generate TOC from page body
const toc = computed(() => {
  if (!page.value?.body) return { links: [] }
  const links: any[] = []
  function extractHeadings(node: any) {
    if (!node) return
    if (node.tag && /^h[2-4]$/.test(node.tag)) {
      const depth = parseInt(node.tag[1])
      const text = extractText(node)
      const id = node.props?.id || text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      links.push({ id, depth, text })
    }
    if (node.children) {
      for (const child of node.children) {
        extractHeadings(child)
      }
    }
    if (node.value && Array.isArray(node.value)) {
      for (const child of node.value) {
        extractHeadings(child)
      }
    }
  }
  function extractText(node: any): string {
    if (node.type === 'text') return node.value || ''
    if (node.children) return node.children.map(extractText).join('')
    if (node.value && typeof node.value === 'string') return node.value
    if (node.value && Array.isArray(node.value)) return node.value.map(extractText).join('')
    return ''
  }
  extractHeadings(page.value.body)
  return { links }
})

// Add more to meta tag head
useHead({
  meta: [{
    property: 'og:type',
    content: 'article'
  }, {
    property: 'article:publisher',
    content: author.value?.profileUrl
  }, {
    property: 'article:author',
    content: author.value?.profileUrl
  }]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="container px-3 pt-12 mx-auto prose dark:prose-invert prose-img:mx-auto flex flex-wrap">

      <div class="mb-0 w-full pb-2">
        <div v-if="series"
             class="text-gray-400 text-md font-medium mb-2 hover:cursor-pointer">
          # {{ series }}
        </div>
        <div class="text-5xl font-bold text-gray-900 dark:text-gray-100">
          {{ page?.title }}
        </div>
      </div>

      <div class="pb-4 w-full flex flex-wrap">
        <Tag v-for="keyword in keywords"
             :key="keyword"
             :name="keyword" />
      </div>

      <div class="text-lg w-full text-gray-700 dark:text-gray-300">
        {{ page?.description }}
      </div>

      <BlogAuthor :author="author!"
                  :read="read!"
                  :date="date!"
                  class="w-full" />

      <img :src="heroSrc"
           :alt="hero?.alt"
           class="mt-0 hero w-full" />

      <Expandable name="目錄"
                  class="mb-2">
        <TableOfContent :toc="toc"
                        class="justify-self-start w-full" />
      </Expandable>
      <slot />
    </div>

    <div class="flex flex-wrap justify-evenly items-start md:mx-15 px-4 pb-8">
      <PostCard v-if="prev"
                :page="prev"
                title="< 上一篇" />
      <PostCard v-if="next"
                :page="next"
                title="下一篇 >" />
    </div>
  </div>
</template>
