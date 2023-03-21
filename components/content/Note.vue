<script setup lang="ts">
defineProps({
  textSize: {
    type: String,
    default: 'text-sm'
  }
})
</script>

<template>
  <div :class="`border-l-4 border-zinc-400 px-4 font-base ${textSize}`">
    <slot />
  </div>
</template>