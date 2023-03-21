<script setup lang="ts">
const { data } = await useAsyncData(() => {
  return queryContent('/blog/').find()
})
</script>

<template>
  <div>
    <div v-for="post in data"
         :key="post._id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <NuxtLink :to="post._path">
        Read more ...
      </NuxtLink>
    </div>
  </div>
</template>