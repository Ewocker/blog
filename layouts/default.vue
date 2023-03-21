<script setup lang="ts" >
const { navigation } = useContent()
</script>

<template>
  <div>
    <Header />
    <div class="container mx-auto p-4 prose">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>