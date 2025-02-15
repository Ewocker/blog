<script setup></script>

<template>
    <p class="typingEffect">
      <slot/>
    </p>
</template>

<style scoped>

.typingEffect {
  width: 0;
  overflow: hidden; /* Ensure the text is not visible until the typewriter effect*/
  //border-right: 2px solid white; /* The cursor*/
  //font-size: 16px;
  white-space: nowrap; /* Keeps the text on a single line */
  animation: typing 2s steps(30) forwards;
}

/* The typing animation */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
</style>