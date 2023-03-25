<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String
  },
  className: {
    type: String
  }
})

const calculatedUrl = props.url ? props.url : `/tag?tag=${props.name}`

const classes = computed(() => {
  const raw = [
    'bg-red-100',
    'text-red-800',
    'text-xs',
    'font-medium',
    'mr-2',
    'px-2',
    'py-1',
    'rounded',
    'dark:bg-red-900',
    'dark:text-red-300',

    // hover effect
    'hover:cursor-pointer',
    'transition',
    'duration-300',
    'hover:shadow-black/50',
    'ease-in-out',
    'hover:shadow-md'
  ]
  return `${raw.join(' ')} ${props.className}`
})
</script>

<template>
  <a :href="calculatedUrl">
    <span :class="classes"
          class="hover:shadow-bl">
      {{ name }}
    </span>
  </a>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>