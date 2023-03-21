<script setup lang="ts">
import type { Page, Toc, Meta } from '~/type/nuxt-content-type'
import * as utils from '~/utils/nuxt-content'

type Content = {
  page: Ref<Page>;
  prev: Ref<Page>;
  next: Ref<Page>;
  toc: Ref<Toc>;
}

const { page, toc, prev, next }: Content = useContent()

const getMeta = (name: string): Meta | undefined =>
  page.value.head.meta.find((o: any) => o.name === name)

const authorImage = utils.getPageMeta(page.value, 'authorImage')?.content
const author = utils.getPageMeta(page.value, 'author')?.content
const date = utils.getPageMeta(page.value, 'date')?.content
const read = utils.getPageMeta(page.value, 'read')?.content
const keywords = utils.getPageKeywords(page.value)
const series = page.value.series
const hero = page.value.image
</script>

<template>
  <div>
    <Header />

    <div class="container px-3 pt-12 mx-auto prose prose-img:mx-auto flex flex-wrap">

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
        <span v-for="keyword in keywords"
              :key="keyword"
              class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 hover:cursor-pointer">
          {{ keyword }}
          <!-- TODO Link -->
        </span>
      </div>

      <div class="text-lg w-full">
        {{ page.description }}
      </div>

      <BlogAuthor :author="author!"
                  :read="read!"
                  :date="date!"
                  :img="authorImage!"
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
    <Copyright class="text-right px-4 py-4" />

  </div>
</template>
