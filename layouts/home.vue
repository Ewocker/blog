<script setup lang="ts">
const { data: featuredPost } = await useAsyncData('featured', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .where('featured', '=', true)
    .where('layout', '=', 'post')
    .first()
)

const { data: allLatest } = await useAsyncData('latest', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .where('layout', '=', 'post')
    .limit(10)
    .all()
)

const latestPosts = computed(() =>
  allLatest.value?.filter((p: any) => !p.featured)?.slice(0, 4)
)

const firstPost = computed(() => latestPosts.value?.[0])
const stackedPosts = computed(() => latestPosts.value?.slice(1, 4))
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Hero Banner -->
    <div class="relative overflow-hidden bg-gradient-to-br from-[#0c2d48] via-[#1a1a2e] to-[#2d1b69] py-16 text-center">
      <div class="relative z-10">
        <img src="/common/logo-inverted.png" class="w-16 mx-auto mb-4" alt="logo">
        <h1 class="text-4xl lg:text-5xl font-semibold text-white font-family-cyly px-6">
          分享小貓貓工程師走在矽谷路上遇見的大小事～
        </h1>
        <p class="text-gray-400 mt-3 text-sm">Engineering · AI · OMSCS · Life in Silicon Valley</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-6">
      <!-- Featured Post -->
      <FeatureCard v-if="featuredPost" :page="featuredPost" class="mb-6" />

      <!-- Magazine Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        <!-- Large card -->
        <div v-if="firstPost" class="lg:col-span-3">
          <PostCard :page="firstPost" class="!max-w-none" />
        </div>
        <!-- Stacked small cards -->
        <div v-if="stackedPosts?.length" class="lg:col-span-2 flex flex-col gap-4">
          <a
            v-for="post in stackedPosts"
            :key="post.id"
            :href="post.path"
            class="flex gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md hover:translate-x-1 transition-all"
          >
            <img
              v-if="post.image"
              :src="post.image.src.startsWith('/') ? post.image.src : `${post.path}/${post.image.src}`"
              :alt="post.image?.alt"
              class="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            >
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{{ post.title }}</div>
              <div class="text-xs text-gray-400 mt-1 line-clamp-1">{{ post.description }}</div>
            </div>
          </a>
        </div>
      </div>

      <!-- View all -->
      <div class="text-center pb-8">
        <a href="/blog" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">
          View all posts →
        </a>
      </div>
    </div>
  </div>
</template>
