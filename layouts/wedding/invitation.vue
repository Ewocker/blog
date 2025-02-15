<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'

const { data: posts } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/').where({ layout: { $ne: 'series' } }).limit(10).find() as unknown as Promise<Array<Page>>
})

// Manually decide the featured post
console.log(posts.value)
const featuredPostNumber = 0
const featuredPost = posts.value![featuredPostNumber]!

// remove featured post from posts
posts.value?.splice(featuredPostNumber, 1)
</script>

<template>
  <div class="grid-container">
    <!-- Banner -->
    <div class="grid-banner">
      <div class="w-full flex justify-center items-end">
<!--        <img src="/common/logo-inverted.png"-->
<!--             class="w-40 mt-20"-->
<!--             alt="logo">-->
      </div>
      <TypingEffect>
        <p class="w-full text-center lg:text-8xl text-6xl font-semibold text-white lg:pt-36 md:p-28 pt-28 px-6 font-family-cyly">
          We are Married! 🎉
        </p>
      </TypingEffect>

      <TypingEffect>
        <p class="w-full text-center lg:text-8xl text-6xl font-semibold text-white lg:pt-36 md:p-28 pt-28 px-6 font-family-cyly">

        </p>
      </TypingEffect>
    </div>
<!--    <div class="grid-feature">-->
<!--      &lt;!&ndash; show feature post style only on md above &ndash;&gt;-->
<!--      <FeatureCard :page="featuredPost"-->
<!--                   class="hidden lg:flex mb-2" />-->
<!--      <PostCard :page="featuredPost"-->
<!--                class="lg:hidden" />-->
<!--    </div>-->
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
  height: 50rem;
  background-image: url('/wedding/ZFC_3354.jpg');
  background-position: center;
  background-size: cover;
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
  align-items: center;
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