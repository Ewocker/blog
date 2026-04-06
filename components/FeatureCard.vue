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
})

// console.log('FeatureCard', props.page)

const getMeta = (name: string): Meta | undefined =>
  props.page.head?.meta?.find((o: any) => o.name === name)
const date = getHumanDate(getPageDate(props.page))
const read = getMeta('read')?.content
const computedImageSrc = computed(computeImageSrc(props.page.image.src, props.page._path))
</script>

<template>
  <div class="flex flex-wrap w-full rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div class="w-1/2 flex justify-center overflow-hidden">
      <a v-if="page.image"
         :href="page._path"
         class="w-full">
        <div class="group flex justify-center text-center relative overflow-hidden cursor-pointer w-full"
             style="height: 35rem;">
          <img :src="computedImageSrc"
               :alt="page.image.alt"
               class="object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125 w-full" />
          <div class="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
        </div>
      </a>
    </div>
    <div class="w-1/2 flex flex-col md:px-10 lg:pt-12 lg:pb-6 md:pt-6 md:pb-4">
      <a v-if="page.title"
         :href="page._path"
         class="flex-1">
        <div class="text-4xl w-full mb-5 font-semibold text-gray-900">
          {{ page.title }}
        </div>
        <div class="text-lg w-full font-light text-gray-600 line-clamp-10">
          {{ page.description }}
        </div>
      </a>
      <div class="text-gray-400 text-right mt-4 text-sm font-light border-t border-gray-100 pt-4">
        {{ date }} · {{ read }}
      </div>
    </div>
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