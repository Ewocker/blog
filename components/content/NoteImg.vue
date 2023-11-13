<template>
  <div class="font-medium text-xs text-center text-gray-400 not-prose">
    <slot />
  </div>
</template>

<style>
/* not prose auto */
.prose-img\:mx-auto :is(:where(img):where([class~="not-prose"] *)) {
  margin: 0 auto 10px;
}

.not-prose img {
  margin-bottom: 10px;
}

.not-prose:has(div) img {
  margin-bottom: 15px;
}
</style>