<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/').find() as unknown as Promise<Array<Page>>
})
</script>

<template>
  <div>
    <div class="container mx-auto p-4 prose prose-img:mx-auto">
      <slot />
    </div>
    <div class="flex flex-wrap justify-evenly items-start md:mx-15">
      <PostCard v-for="post in data"
                :key="post._id"
                :page="post"
                class="w-full mb-6" />
    </div>
  </div>
</template>