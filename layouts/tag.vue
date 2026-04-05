<script setup lang="ts">
import { getPageDate } from '~/utils/nuxt-content'
import { getHumanDate } from '~/utils/date'
import { computeImageSrc } from '~/utils/image'

const route = useRoute()
const router = useRouter()
const activeTag = computed(() => route.query.tag?.toString() || '')

// Fetch all non-series blog posts, then filter by tag client-side
// v3 queryCollection doesn't support $contains on JSON arrays directly
const { data: allBlogPosts } = await useAsyncData('allBlogPosts', () =>
  queryCollection('content')
    .path('/blog/')
    .where('layout', '<>', 'series')
    .all()
)

const posts = computed(() => {
  if (!activeTag.value || !allBlogPosts.value) return []
  return allBlogPosts.value.filter((p: any) =>
    p.keywords?.includes(activeTag.value)
  )
})

const { data: allSeries } = await useAsyncData('allTags', () =>
  queryCollection('content')
    .path('/blog/')
    .where('layout', '=', 'series')
    .all()
)

const allTags = computed(() => {
  const tagSet = new Set<string>()
  allSeries.value?.forEach((page: any) => page.keywords?.forEach((tag: string) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
})

function switchTag(tag: string) {
  router.push({ path: '/tag', query: { tag } })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header -->
    <div class="bg-gradient-to-br from-purple-50 to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-8 text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Posts tagged</h1>
      <span class="inline-block text-sm px-4 py-1 rounded-full bg-purple-600 text-white font-semibold">
        {{ activeTag }}
      </span>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">{{ posts?.length ?? 0 }} posts found</p>
    </div>

    <!-- Filter bar -->
    <div class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3">
      <div class="max-w-4xl mx-auto flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="switchTag(tag)"
          :class="[
            'text-xs px-3 py-1 rounded-full border transition-all',
            tag === activeTag
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >{{ tag }}</button>
      </div>
    </div>

    <!-- Results grid -->
    <div class="max-w-4xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          v-for="post in posts"
          :key="post.id"
          :href="post.path"
          class="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <img
            v-if="post.image"
            :src="computeImageSrc(post.image.src, post.path)()"
            :alt="post.image?.alt"
            class="w-full h-32 object-cover"
          >
          <div class="p-4">
            <div class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{{ post.title }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{{ post.description }}</div>
            <div class="text-xs text-gray-400 mt-2">{{ getHumanDate(getPageDate(post as any)) }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
