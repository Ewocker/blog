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
       class="border flex gap-4 m-2 rounded-md overflow-hidden hover:cursor-pointer transition duration-300 hover:shadow-black/50 ease-in-out hover:shadow-md">
    <a v-if="page.image"
       :href="page._path">
      <div class="group flex justify-center bg-gray-400 text-center relative overflow-hidden cursor-pointer w-52 h-32">
        <img :src="computedImageSrc"
             :alt="page.image.alt"
             class="object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125 w-full rounded-none" />
        <div class="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
      </div>
    </a>

    <a v-if="page.title"
       :href="page._path">
      <div class="text-4xl font-semibold font-family-cyly pt-2 w-full">
        {{ page.title }}
      </div>
      <div class="text-md w-full font-light line-clamp-3">
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