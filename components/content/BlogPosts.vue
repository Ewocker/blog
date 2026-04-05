<script setup lang="ts">
const { data } = await useAsyncData(() => {
  return queryCollection('content').path('/blog/').all()
})
</script>

<template>
  <div>
    <div v-for="post in data"
         :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <NuxtLink :to="post.path">
        Read more ...
      </NuxtLink>
    </div>
  </div>
</template>
