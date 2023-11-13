<template>
  <img :src="refinedSrc"
       :alt="alt"
       :width="width"
       :height="height" />
</template>

<script setup lang="ts">
import { computeImageSrc } from '~/utils/image'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const route = useRoute()
const refinedSrc = computed(computeImageSrc(props.src, route.path))
</script>