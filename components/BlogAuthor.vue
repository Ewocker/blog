<script setup lang="ts">
defineProps({
  img: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  read: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="text-black text-sm dark:text-gray-400 flex items-center gap-2">
    <div>
      <img class="w-12 h-12 rounded-full hover:cursor-pointer"
           :src="img"
           alt="author photo">
    </div>
    <div>
      <a class="text-gray-700 hover:text-blue-400 text-base font-medium"
         href="">
        {{ author }}
      </a>
      <br />
      <span class="text-gray-400">
        {{ date }} · {{ read }}
      </span>
    </div>
  </div>
</template>