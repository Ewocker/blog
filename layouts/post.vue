<script setup lang="ts">
import type { Page, Toc } from '~/type/nuxt-content-type'
import authors from '~/components/BlogAuthor/data'
import { getPageMeta, getPageDate } from '~/utils/nuxt-content'

type Content = {
  page: Ref<Page>;
  prev: Ref<Page>;
  next: Ref<Page>;
  toc: Ref<Toc>;
}

const { page, toc, prev, next }: Content = useContent()
const authorName = getPageMeta(page.value, 'author')?.content || '小貓貓工程師'
const author = authors.get(authorName)
const date = getPageDate(page.value)
const read = getPageMeta(page.value, 'read')?.content
const keywords = page.value.keywords
const series = page.value.series
const hero = page.value.image

// Add more to meta tag head
useHead({
  meta: [{
    property: 'og:type',
    content: 'article'
  }, {
    property: 'article:publisher',
    content: author?.facebook
  }, {
    property: 'article:author',
    content: author?.facebook
  }]
})
</script>

<template>
  <div>
    <div class="container px-3 pt-12 mx-auto prose prose-img:mx-auto flex flex-wrap">

      <!-- {{ config }} -->
      <div class="mb-0 w-full pb-2">
        <div v-if="series"
             class="text-gray-400 text-md font-medium mb-2 hover:cursor-pointer">
          # {{ series }}
          <!-- TODO Link -->
        </div>
        <div class="text-5xl font-bold">
          {{ page.title }}
          <!-- TODO Link -->
        </div>
      </div>

      <div class="pb-4 w-full">
        <!-- TODO Link -->
        <Tag v-for="keyword in keywords"
             :key="keyword"
             :name="keyword" />
      </div>

      <div class="text-lg w-full">
        {{ page.description }}
      </div>

      <BlogAuthor :author="author!"
                  :read="read!"
                  :date="date!"
                  class="w-full" />

      <img :src="hero.src"
           :alt="hero.alt"
           class="mt-0 hero w-full" />

      <Expandable name="目錄"
                  class="mb-2">
        <TableOfContent :toc="toc"
                        class="justify-self-start w-full" />
      </Expandable>
      <slot />
    </div>

    <div class="flex flex-wrap justify-evenly items-start md:mx-15">
      <PostCard v-if="prev"
                :page="prev"
                title="< 上一篇" />
      <PostCard v-if="next"
                :page="next"
                title="下一篇 >" />
    </div>
  </div>
</template>