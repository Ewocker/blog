<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'
const route = useRoute()
const tag = route.query.tag?.toString()

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/')
    .where({
      keywords: { $contains: tag || 'nothingIsProvided' },
      layout: { $ne: 'series' }
    })
    .find() as unknown as Promise<Array<Page>>
})
</script>

<template>
  <div class="m-4 md:m-10">
    <div class="font-family-edu text-5xl mb-16 font-semibold text-orange-900 text-center">
      <span>
        All
      </span>
      <span class="underline"> {{ tag }} </span>
      <span>
        posts
      </span>
    </div>
    <div class="flex flex-wrap justify-evenly items-start md:mx-15">
      <PostCard v-for="post in data"
                :key="post._id"
                :page="post"
                class="w-full mb-6" />
    </div>
  </div>
</template>