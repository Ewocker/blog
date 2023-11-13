<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'
import { computeImageSrc } from '~/utils/image'
const route = useRoute()

type Content = { page: Ref<Page> }
const { page }: Content = useContent()

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent(route.path)
    .where({ layout: { $ne: 'series' } })
    .find() as unknown as Promise<Array<Page>>
})
const computedImageSrc = computed(computeImageSrc(page.value.image.src, route.path + '/index'))
</script>

<template>
  <div class="flex flex-wrap py-4 px-2 md:p-16">
    <!-- Series Name -->
    <div v-if="page.series"
         class="w-full xl:pl-16 md:pr-2 md:pl-8 md:pr-5 md:w-1/3 text-center md:text-left">
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
      <img :src="computedImageSrc"
           :alt="page.image.alt"
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