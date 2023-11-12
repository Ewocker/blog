<script lang="ts" setup>
import { computeImageSrc } from '~/utils/image'

const props = defineProps({
  img: {
    type: String,
    required: false,
    default: ''
  },
  alt: {
    type: String,
    required: false,
    default: ''
  }
})
const route = useRoute()
const computedImageSrc = computed(computeImageSrc(props.img, route.path))
</script>

<template>
  <div>
    <img :src="computedImageSrc"
         :alt="alt"
         class="font-medium text-xs text-center text-gray-400 not-prose" />
    <slot />
  </div>
</template>

<style scoped>
/* not prose auto */
.prose-img\:mx-auto :is(:where(img):where([class~="not-prose"] *)) {
  margin: 0 auto 10px;
}
</style>