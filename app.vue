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

.font-family-yrdzst {
  font-family: 'YRDZST';
}

img {
  border-radius: 0.5cqi;
}

/* https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow */
/* flex issues with pre tag overflow */
* {
  min-width: 0;
}
</style>