<script setup lang="ts">
import type { Page, Meta } from 'type/nuxt-content-type'
import { getPageDate } from '~/utils/nuxt-content'
import { getHumanDate } from '~/utils/date'
import { computeImageSrc } from '~/utils/image'

const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true
  },
})

const getMeta = (name: string): Meta | undefined =>
  props.page.head?.meta?.find((o: any) => o.name === name)
const date = getHumanDate(getPageDate(props.page))
const read = getMeta('read')?.content
const computedImageSrc = computed(computeImageSrc(props.page.image?.src, props.page.path || props.page.path || page._path))
</script>

<template>
  <a :href="page.path || page._path" class="block">
    <div class="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg transition-all">
      <div v-if="page.image" class="md:w-1/2 overflow-hidden rounded-xl">
        <img
          :src="computedImageSrc"
          :alt="page.image?.alt"
          class="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
        >
      </div>
      <div class="md:w-1/2 flex flex-col justify-center">
        <span class="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wide mb-2">✨ FEATURED</span>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ page.title }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{{ page.description }}</p>
        <div class="text-xs text-gray-400 mt-3">{{ date }} · {{ read }}</div>
      </div>
    </div>
  </a>
</template>
