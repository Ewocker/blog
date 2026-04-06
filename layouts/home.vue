<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'

const { data: allPosts } = await useAsyncData(() => {
  return queryContent('/blog/').where({ layout: { $ne: 'series' } }).limit(10).find() as unknown as Promise<Array<Page>>
})

const featuredPostIndex = 0
const featuredPost = computed(() => allPosts.value?.[featuredPostIndex])
const posts = computed(() => allPosts.value?.filter((_, i) => i !== featuredPostIndex))
</script>

<template>
  <div class="grid-container">
    <!-- Banner -->
    <div class="grid-banner">
      <div class="w-full flex justify-center items-end">
        <img src="/common/logo-inverted.png"
             class="w-40 mt-20"
             alt="logo">
      </div>
      <p
         class="w-full text-center lg:text-5xl text-4xl font-semibold text-white lg:pt-36 md:p-28 pt-28 px-6 font-family-cyly">
        分享小貓貓工程師走在矽谷路上遇見的大小事～
      </p>
    </div>
    <div class="grid-feature">
      <!-- show feature post style only on md above -->
      <FeatureCard :page="featuredPost"
                   class="hidden lg:flex mb-2" />
      <PostCard :page="featuredPost"
                class="lg:hidden" />
    </div>
    <div class="grid-post">
      <PostCard v-for="post in posts"
                :key="post._id"
                :page="post" />
    </div>

    <div class="grid-more text-center my-16">
      <a href="/blog"
         class="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-sky-900 rounded-full shadow-md hover:bg-sky-800 hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5">
        閱讀更多
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</template>

<!-- /bg-center flex justify-center items-center -->
<style scoped>
.grid-container {
  display: grid;
  width: 100vw;
  grid-template:
    "banner" auto
    "feature" auto
    "post" auto
    "more" 1fr
}

.grid-banner {
  grid-area: banner;
  height: 30rem;
  background-image: url('/common/hero.jpeg');
  background-position: center;
}

.grid-feature {
  grid-area: feature;
  display: grid;
  justify-items: center;
  align-items: center;
  margin-top: 2rem;
  padding: 0rem 2rem;
}

.grid-post {
  padding: 2rem 2rem;
  grid-area: post;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  align-items: start;
  row-gap: 2rem;
}

@media (min-width: 900px) {
  .grid-post {
    padding: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-feature {
    padding: 1rem;
  }
}

@media (min-width: 1280px) {
  .grid-post {
    padding: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-feature {
    padding: 1rem;
  }
}

.grid-more {
  grid-area: more;
}
</style>