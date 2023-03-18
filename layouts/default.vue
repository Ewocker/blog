<script setup lang="ts" >
const { navigation } = useContent()
</script>

<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/"
                  class="font-bold">Nuxt Dojo</NuxtLink>
        <ul class="flex gap-4">
          <li v-for="nav in navigation"
              :key="nav._path">
            <NuxtLink :to="nav._path">
              {{ nav.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto p-4 prose">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>