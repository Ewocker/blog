<script setup lang="ts" >
import type { Page, Meta } from 'type/nuxt-content-type'
import { getPageDate } from '~/utils/nuxt-content'
import { getHumanDate } from '~/utils/date'
import { computeImageSrc } from '~/utils/image'

const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true
  },
  title: {
    type: String,
    required: false
  },
})

const getMeta = (name: string): Meta | undefined =>
  props.page.head?.meta?.find((o: any) => o.name === name)
const date = getHumanDate(getPageDate(props.page))
const read = getMeta('read')?.content
// a workaround for index page not having index in path
let path = props.page._path
if (props.page.layout === 'series') path += '/index'
const computedImageSrc = computed(computeImageSrc(props.page.image?.src, path))
</script>

<template>
  <div class="post-card group/card rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <a v-if="title"
       :href="page._path">
      <div class="text-xl font-normal py-3 w-full text-center">
        {{ title }}
      </div>
    </a>

    <a v-if="page.image"
       :href="page._path">
      <div
           class="group flex justify-center text-center relative overflow-hidden cursor-pointer h-80 w-full">
        <img :src="computedImageSrc"
             :alt="page.image.alt"
             class="object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125 w-full" />
        <div class="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
      </div>
    </a>

    <div class="p-4">
      <a v-if="page.title"
         :href="page._path">
        <div class="text-xl font-semibold w-full text-gray-900 leading-snug">
          {{ page.title }}
        </div>
      </a>

      <a v-if="page.description"
         :href="page._path">
        <div class="text-sm w-full font-light text-gray-600 mt-2 line-clamp-3">
          {{ page.description }}
        </div>
      </a>

      <div class="text-gray-400 text-left mt-3 text-xs font-light border-t border-gray-100 pt-3">
        {{ date }} · {{ read }}
      </div>
    </div>

  </div>
</template>

<style scoped>
.post-card {
  max-width: 400px;
}

.img-card {
  transition: all 1s;
}

.img-card:hover {
  transform: rotate(10deg);
  transform-style: preserve-3d;
}
</style>