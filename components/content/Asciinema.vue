<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

onMounted(() => {
  // Can't use script tags directly apparently
  let asciiscript = document.createElement('script');
  asciiscript.setAttribute('src', `https://asciinema.org/a/${props.id}.js`);
  asciiscript.setAttribute('id', `asciicast-${props.id}`);
  document.getElementById(props.id)?.appendChild(asciiscript);
})
</script>

<template>
  <div class="w-full">
    <figure :id="id" />
  </div>
</template>