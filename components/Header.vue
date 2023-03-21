<script setup lang="ts" >
const { navigation } = useContent()
const showMenu = ref(false)
</script>

<template>
  <header class="shadow-sm bg-white">
    <nav class="container mx-auto p-4 flex justify-between">
      <NuxtLink to="/"
                class="font-bold">
        <img src="/common/logo.png"
             alt="Logo"
             class="h-8 w-8 mr-2">
      </NuxtLink>
      <ul class="flex gap-8">
        <li v-for="nav in navigation"
            :key="nav._path">
          <NuxtLink :to="nav._path">
            {{ nav.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>