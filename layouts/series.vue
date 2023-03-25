<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'
const route = useRoute()
const paths = route.path.split('/').filter(o => o !== '')
const seriesName = paths[paths.length - 1]

type Content = { page: Ref<Page> }
const { page }: Content = useContent()
const series = page.value.series
const hero = page.value.image

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent(`/blog/${seriesName}`).where({ layout: { $ne: 'series' } }).find() as unknown as Promise<Array<Page>>
})
</script>

<template>
  <div class="flex flex-wrap p-4 md:p-16">
    <!-- Series Name -->
    <div v-if="page.series"
         class="w-full pl-16 md:w-1/3 text-center md:text-left">
      <div class="text-gray-600 text-4xl font-medium mb-2">
        {{ page.series }}
      </div>
      <!-- Number of posts -->
      <div class="text-gray-700 text-base font-light">
        A collection of {{ data?.length }} post{{ data?.length! > 1 ? 's' : '' }}
      </div>
    </div>
    <!-- Hero Image -->
    <div class="md:w-2/3">
      <img :src="hero.src"
           :alt="hero.alt"
           class="hero mx-auto object-cover hidden md:block"
           style="max-height: 30rem;" />
    </div>

    <div class="w-full mt-10 flex flex-wrap content-center item-start justify-around">
      <PostCard v-for="page in data"
                :key="page._id"
                :page="page"
                class="mb-4" />
    </div>
  </div>
</template>