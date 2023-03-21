<template>
  <div class="border-l-4 border-zinc-200 px-4 font-light text-sm not-prose">
    <div class="footnote">Footnotes</div>
    <slot />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation&display=swap');

.footnote {
  font-family: 'Edu NSW ACT Foundation', cursive;
}
</style>