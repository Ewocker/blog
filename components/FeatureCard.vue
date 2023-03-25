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
  <div class="border flex gap-4 rounded-md overflow-hidden hover:cursor-pointer">
    <a v-if="page.image"
       :href="page._path">
      <div class="group flex justify-center bg-gray-400 text-center relative overflow-hidden cursor-pointer"
           style="width: 50rem; height: 30rem;">
        <img :src="page.image.src"
             :alt="page.image.alt"
             class="object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125 w-full rounded-none" />
        <div class="absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
      </div>
    </a>

    <a v-if="page.title"
       :href="page._path">
      <div class="text-3xl font-semibold font-family-edu pt-2 w-full">
        {{ page.title }}
      </div>
      <div class="text-lg w-full font-light line-clamp-3">
        {{ page.description }}
      </div>
    </a>
    <slot />
  </div>
</template>

<!-- <a v-if="page.description"
                   :href="page._path">
                  <div class="text-md w-full font-light line-clamp-3">
                    {{ page.description }}
                  </div>
                </a>

                <div class="text-gray-400 text-left mt-2 text-sm font-light">
                  {{ date }} · {{ read }}
                </div> -->

<style scoped>
.img-card {
  transition: all 1s;
}

.img-card:hover {
  transform: rotate(10deg);
  transform-style: preserve-3d;
}
</style>