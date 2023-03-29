<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'

const { data: posts } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/').where({ layout: { $ne: 'series' } }).limit(10).find() as unknown as Promise<Array<Page>>
})

const featuredPost = posts.value![0]!
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
      <p class="w-full text-center text-3xl text-white mt-36 font-family-edu">
        分享小貓貓工程師走在矽谷路上遇見的大小事～
      </p>
    </div>
    <div class="grid-feature">
      <!-- show feature post style only on md above -->
      <FeatureCard :page="featuredPost"
                   class="hidden lg:flex" />
      <PostCard :page="featuredPost"
                class="lg:hidden" />
    </div>
    <div class="grid-post">
      <PostCard v-for="post in posts?.slice(1)"
                :key="post._id"
                :page="post" />
    </div>
    <div class="grid-more font-family-edu text-center mb-10 text-4xl text-blue-700 hover:text-blue-500">
      <a href="/blog">
        Read more...
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
  margin: 0 5rem;
}

.grid-post {
  padding: 2rem 2rem;
  grid-area: post;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  align-items: center;
  row-gap: 2rem;
}

@media (min-width: 1280px) {
  .grid-post {
    padding: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-more {
  grid-area: more;
}
</style>