<script setup lang="ts">
defineProps({
  class: {
    type: String,
  }
})
</script>

<template>
  <div :class="class">
    <slot />
  </div>
</template>