<script setup lang="ts"></script>

<template>
  <div class="w-full flex flex-col h-screen">
    <div class="bg-gray-100 p-6 lg:block hidden">
      <h1 class="text-2xl font-bold mb-1">Career Copilot</h1>
      <p class="text-gray-700">
        Career Copilot is an AI-powered resume assistant that transforms your
        professional experience into an interactive chat interface. Using
        LangChain, Gradio, and RAG, it lets recruiters naturally converse with a
        resume instead of scanning a static PDF.
      </p>
    </div>
    <div class="flex-1 min-h-0 h-screen lg:h-auto">
      <iframe
        src="https://ewocker-careercopilot.hf.space"
        class="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Career Copilot"
        allowfullscreen
      />
    </div>
  </div>
</template>

<style scoped>
/* Add bottom margin to avoid copyright overlap */
.flex-1 {
  margin-bottom: 60px;
}
</style>
