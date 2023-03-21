<template>
  <div class="border-zinc-200 font-light text-xs text-center not-prose">
    <slot />
  </div>
</template>

<style>
/* not prose auto */
.prose-img\:mx-auto :is(:where(img):where([class~="not-prose"] *)) {
  margin: 0 auto;
}
</style>