<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'
import { getPageDate } from '~/utils/nuxt-content'
import { getHumanDate } from '~/utils/date'
import { computeImageSrc } from '~/utils/image'

const route = useRoute()
const activeView = ref<'series' | 'latest'>('series')

const { data: seriesData } = await useAsyncData('series', () =>
  queryContent(route.path).where({ layout: { $eq: 'series' } }).find() as unknown as Promise<Array<Page>>
)

const { data: allPosts } = await useAsyncData('allPosts', () =>
  queryContent('/blog/').where({ layout: { $ne: 'series' } }).limit(20).find() as unknown as Promise<Array<Page>>
)

const recentPosts = computed(() => allPosts.value?.slice(0, 5))

const tags = computed(() => {
  const tagSet = new Set<string>()
  seriesData.value?.forEach(page => page.keywords?.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).sort()
})

const episodeCounts = ref<Record<string, number>>({})
onMounted(async () => {
  if (!seriesData.value) return
  for (const series of seriesData.value) {
    const episodes = await queryContent(series._path!)
      .where({ layout: { $ne: 'series' } })
      .find()
    episodeCounts.value[series._path!] = episodes.length
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-6">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">All Series</h1>
        <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            @click="activeView = 'series'"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-all',
              activeView === 'series'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm font-semibold'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >Series</button>
          <button
            @click="activeView = 'latest'"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-all',
              activeView === 'latest'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm font-semibold'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >Latest</button>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      <div class="flex-1">
        <template v-if="activeView === 'series'">
          <a
            v-for="series in seriesData"
            :key="series._id"
            :href="series._path"
            class="flex gap-4 p-4 mb-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md hover:translate-x-1 transition-all"
          >
            <img
              v-if="series.image"
              :src="computeImageSrc(series.image.src, series._path + '/index')()"
              :alt="series.image?.alt"
              class="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            >
            <div class="flex-1 min-w-0">
              <div class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ series.series || series.title }}</div>
              <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">
                {{ episodeCounts[series._path!] ?? '...' }} episodes
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{{ series.description }}</div>
            </div>
            <div class="flex items-center text-gray-300 dark:text-gray-600 text-lg">→</div>
          </a>
        </template>

        <template v-else>
          <a
            v-for="post in allPosts"
            :key="post._id"
            :href="post._path"
            class="flex gap-4 p-4 mb-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md hover:translate-x-1 transition-all"
          >
            <div class="flex-1 min-w-0">
              <div class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ post.title }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{{ post.description }}</div>
              <div class="text-xs text-gray-400 mt-2">{{ getHumanDate(getPageDate(post)) }}</div>
            </div>
            <div class="flex items-center text-gray-300 dark:text-gray-600 text-lg">→</div>
          </a>
        </template>
      </div>

      <div class="lg:w-56 flex-shrink-0 space-y-6">
        <div>
          <h3 class="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">Recent Posts</h3>
          <div class="space-y-2">
            <a
              v-for="post in recentPosts"
              :key="post._id"
              :href="post._path"
              class="block py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div class="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">{{ post.title }}</div>
              <div class="text-xs text-gray-400 mt-1">{{ getHumanDate(getPageDate(post)) }}</div>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="tag in tags"
              :key="tag"
              :href="`/tag?tag=${tag}`"
              class="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >{{ tag }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
