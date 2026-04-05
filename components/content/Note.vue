<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: 'text-sm'
  }
})
const classes = computed(() => `border-l-2 border-zinc-400 dark:border-zinc-600 px-4 font-base ${props.class}`)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>