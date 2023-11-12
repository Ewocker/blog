<template>
  <section>
    <img :src="refinedSrc"
         :alt="alt"
         :width="width"
         :height="height"
         :style="showAlt || note ? 'margin-bottom: 2px;' : ''">
    <div v-if="showAlt"
         class="font-medium text-xs text-center text-gray-400 not-prose">
      {{ alt }}
    </div>
    <Note v-if="note"
          class="text-sm mt-4 italic text-gray-500">
      {{ note }}
    </Note>
  </section>
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
  note: {
    type: String,
    default: ''
  },
  showAlt: {
    type: Boolean,
    default: false
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