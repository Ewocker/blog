<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'
import * as utils from '~/utils/nuxt-content'

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/').find() as unknown as Promise<Array<Page>>
})

const series = ref(new Map<string, Array<Page>>())
const tags = ref(new Map<string, Array<Page>>())
for (let page of data.value!) {
  if (page.series) {
    if (!series.value.has(page.series)) series.value.set(page.series, [])
    series.value.get(page.series)?.push(page)
  }
  const keywords = utils.getPageKeywords(page)
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
             :key="'seriepage' + page.title"
             class="pl-4">
          {{ page.title }}
        </div>
      </div>
    </div>
  </div>
</template>