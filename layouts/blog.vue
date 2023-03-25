<script setup lang="ts">
import type { Page } from 'type/nuxt-content-type'

const { data } = await useAsyncData(() => {
  // use custom type as nuxt-content does not implement type well
  return queryContent('/blog/').where({ layout: { $eq: 'series' } }).find() as unknown as Promise<Array<Page>>
})

const { page }: { page: Ref<Page> } = useContent()
const tags = ref(new Set<string>())
for (let page of data.value!) {
  page.keywords?.forEach(tag => tags.value.add(tag))
}
</script>

<template>
  <div>
    <div class="container mx-auto p-4 prose lg:prose-xl">
      <img :src="page.image.src"
           :alt="page.image.alt"
           class="mt-0 hero w-full" />
    </div>
    <div class="flex flex-wrap px-10">
      <div class="flex flex-wrap w-full lg:w-2/3 px-10">
        <div class="w-full font-family-edu text-5xl mb-5 underline font-semibold text-orange-800">
          <i>Story</i>
        </div>
        <TocCard v-for="page in data"
                 :key="'serie' + page._id"
                 :page="page"
                 class="w-full not-prose" />
      </div>

      <div class="w-full lg:w-1/3 px-10">
        <div class="w-full font-family-edu text-5xl mb-5 underline font-semibold text-orange-800">
          <i>Tag</i>
        </div>
        <div class="w-full flex-wrap inline-flex gap-2">
          <Tag v-for="tag in Array.from(tags).sort()"
               :name="tag"
               :key="tag"
               className="bg-orange-300 text-orange-800" />
        </div>
      </div>
    </div>
  </div>
</template>