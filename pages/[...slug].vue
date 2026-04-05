<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path)

const { data: page } = await useAsyncData(`page-${path.value}`, () =>
  queryCollection('content').path(path.value).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, message: 'Page not found' })
}

// Set layout from frontmatter
const layout = computed(() => page.value?.layout || 'default')
definePageMeta({ layout: false })

// Set head metadata from content
if (page.value) {
  useHead({
    title: page.value.title,
    meta: [
      { name: 'description', content: page.value.description },
      ...(page.value.head?.meta || []).map((m: any) => ({
        ...(m.name ? { name: m.name } : {}),
        ...(m.property ? { property: m.property } : {}),
        content: m.content,
      })),
    ],
  })

  useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
    ...(page.value.image ? { ogImage: page.value.image.src } : {}),
  })
}

// Provide page data for layouts
provide('content-page', page)
</script>

<template>
  <NuxtLayout :name="layout">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
