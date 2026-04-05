<script setup lang="ts">
import { computeImageSrc } from '~/utils/image'
import { getPageDate } from '~/utils/nuxt-content'
import { getHumanDate } from '~/utils/date'

const route = useRoute()
const page = inject<Ref<any>>('content-page')!

const { data: episodes } = await useAsyncData(() =>
  queryCollection('content')
    .path(route.path)
    .where('layout', '<>', 'series')
    .all()
)

const computedHeroSrc = computed(computeImageSrc(page.value.image?.src, route.path + '/index'))

function getEpisodeNumber(ep: any): string {
  const stem = ep.stem || ''
  const file = stem.split('/').pop() ?? ''
  return file.replace(/^0*/, '') || '00'
}

function getEpisodeImageSrc(ep: any): string {
  if (!ep.image?.src) return ''
  return computeImageSrc(ep.image.src, ep.path)()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Full-width Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#2d1b69] py-16 px-6">
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <h1 class="text-3xl lg:text-4xl font-bold text-white mb-2">{{ page?.series || page?.title }}</h1>
        <div class="text-sm text-gray-400 mb-4">{{ episodes?.length }} episodes · by 小貓貓工程師</div>
        <p class="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">{{ page?.description }}</p>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="max-w-3xl mx-auto px-6 py-3 text-sm text-gray-500 dark:text-gray-400">
      <a href="/blog" class="text-purple-600 dark:text-purple-400 hover:underline">Blog</a>
      <span class="mx-2">/</span>
      <span>{{ page?.series || page?.title }}</span>
    </div>

    <!-- Timeline -->
    <div class="max-w-3xl mx-auto px-6 pb-12 relative">
      <!-- Timeline line -->
      <div class="absolute left-[2.15rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-purple-200 dark:from-purple-600 dark:to-purple-900 hidden md:block"></div>

      <div v-for="(ep, idx) in episodes" :key="ep.id" class="relative flex gap-4 mb-6">
        <!-- Dot -->
        <div class="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white text-sm font-bold items-center justify-center z-10 ring-4 ring-gray-50 dark:ring-gray-950">
          {{ getEpisodeNumber(ep) }}
        </div>

        <!-- Card -->
        <a
          :href="ep.path"
          class="flex-1 flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg hover:translate-x-2 transition-all"
        >
          <img
            v-if="ep.image"
            :src="getEpisodeImageSrc(ep)"
            :alt="ep.image?.alt"
            class="w-24 h-20 rounded-lg object-cover flex-shrink-0 hidden sm:block"
          >
          <div class="flex-1 min-w-0">
            <span class="md:hidden inline-block text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
              EP {{ getEpisodeNumber(ep) }}
            </span>
            <div class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ ep.title }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ ep.description }}</div>
            <div class="text-xs text-gray-400 mt-2">{{ getHumanDate(getPageDate(ep as any)) }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
