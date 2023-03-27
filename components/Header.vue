<script setup lang="ts" >
const { navigation } = useContent()
const showMenu = ref(false)
</script>

<template>
  <header class="shadow-sm bg-white">
    <nav class="flex items-center justify-between flex-wrap bg-sky-900 p-4 w-full z-10 top-0">
      <div class="flex items-center justify-center flex-shrink-0 text-white">
        <NuxtLink to="/"
                  class="flex font-bold text-gray-200">
          <img src="/common/logo.png"
               alt="Logo"
               class="h-14 w-14 mr-3">
          <div class="hidden lg:flex items-center justify-center text-4xl font-family-cyly">
            矽谷路上遇見你
          </div>
        </NuxtLink>
      </div>

      <div class="block lg:hidden">
        <button @click="showMenu = !showMenu"
                class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
           :class="`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-3 lg:pt-0 ${showMenu ? '' : 'hidden'}`">
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li v-for="nav in navigation"
              :key="nav._path"
              class="mr-3">
            <NuxtLink class="inline-block py-2 px-4 text-gray-200 no-underline"
                      :to="nav._path">
              {{ nav.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>