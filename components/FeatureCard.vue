<script setup lang="ts" >
import type { Page, Meta } from 'type/nuxt-content-type'
import { getPageDate } from '~/utils/nuxt-content'
import { getHumanDate } from '~/utils/date'

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
</script>

<template>
  <div class="flex flex-wrap w-full">
    <div class="w-1/2 flex justify-center overflow-hidden">
      <a v-if="page.image"
         :href="page._path">
        <div class="group flex justify-center bg-gray-400 text-center relative rounded-md overflow-hidden cursor-pointer"
             style="max-width: 45rem; height: 35rem;">
          <img :src="page.image.src"
               :alt="page.image.alt"
               class="object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125 w-full rounded-none" />
          <div class="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
        </div>

      </a>
    </div>
    <div class="w-1/2 flex text-center md:px-10 lg:pt-12 md:pt-2">
      <a v-if="page.title"
         :href="page._path">
        <div style="max-width: 40rem;">
          <div class="text-4xl w-full mb-5">
            {{ page.title }}
          </div>
          <div class="text-lg w-full font-light line-clamp-10">
            {{ page.description }}
          </div>
          <div class="text-gray-400 text-right mt-2 text-sm font-light">
            {{ date }} · {{ read }}
          </div>
        </div>
      </a>
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