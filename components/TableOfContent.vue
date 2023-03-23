<script setup lang="ts" >
import type { Toc } from 'type/nuxt-content-type'

defineProps({
  toc: {
    type: Object as PropType<Toc>,
    required: true
  },
})
</script>

<template>
  <div>
    <ul v-if="toc && toc.links">
      <li v-for="link in toc.links"
          :key="link.text">
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
        <ul v-if="link.children">
          <li v-for="sublink in link.children"
              :key="sublink.text">
            <a :href="`#${sublink.id}`">
              {{ sublink.text }}
            </a>
            <ul v-if="sublink.children">
              <li v-for="subsublink in sublink.children"
                  :key="subsublink.text">
                <a :href="`#${subsublink.id}`">
                  {{ subsublink.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>