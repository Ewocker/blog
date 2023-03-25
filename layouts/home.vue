<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'

const { data: posts } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/').where({ layout: { $ne: 'series' } }).limit(9).find() as unknown as Promise<Array<Page>>
})
</script>

<template>
  <div>
    <!-- Banner -->
    <div class="flex flex-wrap w-full banner bg-[url('/common/hero.jpeg')] bg-cover bg-center justify-center">
      <div class="w-full flex justify-center items-end pb-5">
        <img src="/common/logo.png"
           class="w-32"
           alt="logo">
    </div>
      <p class="w-full text-center text-2xl text-white">
        分享小貓貓工程師走在矽谷路上遇見的大小事～
      </p>
    </div>
    <div class="p-10 flex flex-wrap justify-center md:justify-around items-start md:mx-15">
      <!-- <FeatureCard :page="posts?.at(0)!" />
                          <div class="w-full p-5">
                            <hr />
                          </div> -->
      <PostCard v-for="post in posts"
                :key="post._id"
                :page="post"
                class="w-full mb-6" />

    </div>
    <div class="font-family-edu text-center mb-10 text-4xl text-blue-700 hover:text-blue-500">
      <a href="/blog">
        Read more...
      </a>
    </div>
  </div>
</template>

<!-- /bg-center flex justify-center items-center -->
<style>
.banner {
  height: 30rem;
}
</style>