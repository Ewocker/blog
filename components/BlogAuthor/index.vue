<script setup lang="ts">
import type { Author } from './data'
import { getHumanDate } from '~/utils/date'

defineProps({
  author: {
    type: Object as PropType<Author>,
    required: true
  },
  date: {
    type: Date,
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
           :src="author?.image"
           alt="author image">
    </div>
    <div>
      <a class="text-gray-700 hover:text-blue-400 text-base font-medium"
         :href="author?.url">
        {{ author?.name }}
      </a>
      <br />
      <span class="text-gray-400">
        {{ getHumanDate(date) }} · {{ read }}
      </span>
    </div>
  </div>
</template>