<script setup lang="ts">
const colorMode = useColorMode()

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content')
)

const navItems = computed(() =>
  (navigation.value || []).map((nav: any) => ({
    label: nav.title,
    to: nav.path,
  }))
)

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <UHeader
    to="/"
    :ui="{
      root: 'bg-[#0c2d48] sticky top-0 z-50',
      container: 'max-w-7xl',
      title: 'text-gray-200 text-4xl font-family-cyly',
      left: 'text-gray-200',
      right: 'text-gray-200',
    }"
  >
    <template #title>
      <div class="flex items-center">
        <img
          src="/common/logo.png"
          alt="Logo"
          class="h-14 w-14 mr-3"
        >
        <span class="hidden lg:inline text-4xl font-family-cyly text-gray-200">
          矽谷路上遇見你
        </span>
      </div>
    </template>

    <template #default>
      <UNavigationMenu
        :items="navItems"
        variant="link"
        :ui="{
          link: 'text-gray-200 hover:text-white data-[state=active]:text-white',
        }"
        class="hidden lg:flex"
      />
    </template>

    <template #right>
      <UButton
        :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
        color="neutral"
        variant="ghost"
        size="lg"
        :ui="{ base: 'text-gray-200 hover:text-white' }"
        @click="toggleColorMode"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      />
    </template>

    <template #content>
      <UNavigationMenu
        :items="navItems"
        orientation="vertical"
        class="w-full"
      />
    </template>
  </UHeader>
</template>
