<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'
import * as utils from '~/utils/nuxt-content'

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/post/').find() as unknown as Promise<Array<Page>>
})

const series = new Set<string>()
const tags = new Set<string>()
for (let page of data.value!) {
  if (page.series) series.add(page.series)
  utils.getPageKeywords(page)?.forEach(tag => tags.add(tag))
}
</script>

<template>
  <div>
    <Header />
    <div class="container mx-auto p-4 prose prose-img:mx-auto">
      <slot />
    </div>
    <div>
      <div v-for="serie in series"
           :key="serie">
        {{ serie }}
        <div class="flex flex-wrap justify-evenly items-start md:mx-15">
          <PostCard v-for="post in data?.filter(o => o.series === serie)"
                    :key="'serie' + post._id"
                    :page="post"
                    class="w-full mb-6" />
        </div>
      </div>

      <div v-for="tag in tags"
           :key="'tag' + tag">
        {{ tag }}
        <div class="flex flex-wrap justify-evenly items-start md:mx-15">
          <PostCard v-for="post in data?.filter(o => utils.getPageKeywords(o)?.includes(tag))"
                    :key="'serie' + post._id"
                    :page="post"
                    class="w-full mb-6" />
        </div>
      </div>
    </div>
  </div>
</template>