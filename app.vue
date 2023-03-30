<script setup lang="ts">
const GoogleAnalyticsID = 'G-83X19MTNFC'
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
  }],
  // Google Analytics
  script: [
    {
      tagPosition: 'bodyOpen',
      src: `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsID}`,
      async: true,
    },
    {
      tagPosition: 'bodyOpen',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GoogleAnalyticsID}');
      `
    }
  ],
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

.font-family-cyly {
  font-family: 'cyly';
}

img {
  border-radius: 0.5cqi;
}

/* https://makandracards.com/makandra/511507-flexbox-how-to-prevent-pre-elements-from-overflowing */
/* flex issues with pre tag overflow */
pre {
  min-width: -webkit-fill-available;
  min-width: -moz-available;
  min-width: stretch;
  max-width: 0;
}
</style>