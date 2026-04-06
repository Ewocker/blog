<script setup lang="ts" >
import type { Page } from 'type/nuxt-content-type'
import { computeImageSrc } from '~/utils/image'

const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true
  },
})

// a workaround for index page not having index in path
let path = props.page._path
if (props.page.layout === 'series') path += '/index'
const computedImageSrc = computed(computeImageSrc(props.page.image.src, path))
</script>

<template>
  <div
       class="flex gap-0 m-2 h-36 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
    <a v-if="page.image"
       :href="page._path"
       class="flex-shrink-0 h-full">
      <div class="group flex justify-center text-center relative overflow-hidden cursor-pointer w-52 h-full">
        <img :src="computedImageSrc"
             :alt="page.image.alt"
             class="object-cover h-full w-full ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125" />
        <div class="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
      </div>
    </a>

    <a v-if="page.title"
       :href="page._path"
       class="p-4 flex flex-col justify-center overflow-hidden">
      <div class="text-3xl font-semibold font-family-cyly text-gray-900 w-full">
        {{ page.title }}
      </div>
      <div class="text-sm w-full font-light text-gray-600 mt-2 line-clamp-2">
        {{ page.description }}
      </div>
    </a>
    <slot />
  </div>
</template>

<style scoped>
.img-card {
  transition: all 1s;
}

.img-card:hover {
  transform: rotate(10deg);
  transform-style: preserve-3d;
}
</style>