<script setup lang="ts">
import { getPageKeywords } from '~/utils/nuxt-content'

const { data } = await useAsyncData(() => {
  return queryCollection('content').path('/blog/').all()
})

const series = ref(new Map<string, Array<any>>())
const tags = ref(new Map<string, Array<any>>())
for (let page of data.value!) {
  if ((page as any).series) {
    if (!series.value.has((page as any).series)) series.value.set((page as any).series, [])
    series.value.get((page as any).series)?.push(page)
  }
  const keywords = getPageKeywords(page as any)
  if (keywords) {
    keywords.forEach(tag => {
      if (!tags.value.has(tag)) tags.value.set(tag, [])
      tags.value.get(tag)?.push(page)
    })
  }
}
</script>

<template>
  <div>
    <div class="container mx-auto p-4 prose prose-img:mx-auto">
      <slot />
    </div>

    <div>
      <div v-for="[name, pages] in series"
           :key="'serie' + name">
        {{ name }}
        <div v-for="page in pages"
             :key="'seriepage' + page.title"
             class="pl-4">
          {{ page.title }}
        </div>
      </div>

      <div v-for="[name, pages] in tags"
           :key="'tag' + name">
        {{ name }}
        <div v-for="page in pages"
             :key="'tagpage' + page.title"
             class="pl-4">
          {{ page.title }}
        </div>
      </div>
    </div>
  </div>
</template>
