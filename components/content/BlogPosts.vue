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
      <NuxtLink :to="post._path"
                 class="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5">
        閱讀更多
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>