<script setup>
useHead({
  meta: [{
    name: 'og:site_name',
    content: '矽谷路上遇見你'
  }, {
    property: 'og:type',
    content: 'website'
  }, {
    name: 'robots',
    content: 'index, follow'
  }]
})
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
    <Copyright class="text-right px-4 py-4" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation&display=swap');

.font-family-edu {
  font-family: 'Edu NSW ACT Foundation', cursive;
}

img {
  border-radius: 0.5cqi;
}
</style>