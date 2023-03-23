<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="accordion flex items-center justify-center w-full">
    <div class="w-full">
      <input type="checkbox"
             name="panel"
             id="panel-1"
             class="hidden"
             checked>
      <label for="panel-1"
             class="relative block px-1 bg-slate-100">
        {{ name }}
      </label>
      <div class="accordion__content overflow-hidden">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
label:after {
  content: '+';
  margin-left: 10px;
  /* position: absolute; */
  /* right: 1em; */
}

input:checked+label:after {
  content: '-';
  /* line-height: .8em; */
}

.accordion__content {
  max-height: 0em;
  transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}

input[name='panel']:checked~.accordion__content {
  /* Get this as close to what height you expect */
  max-height: 100%;
}
</style>