<script setup lang="ts"></script>

<template>
  <div class="w-full h-[calc(100vh-120px)]">
    <div class="bg-gray-100 p-6">
      <h1 class="text-2xl font-bold mb-1">Career Copilot</h1>
      <p class="text-gray-700">
        Career Copilot is an AI-powered resume assistant that transforms your
        professional experience into an interactive chat interface. Using
        LangChain, Gradio, and RAG, it lets recruiters naturally converse with a
        resume instead of scanning a static PDF.
      </p>
    </div>
    <iframe
      src="https://ewocker-careercopilot.hf.space"
      class="w-full h-[calc(100%-120px)] border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title="Career Copilot"
      allowfullscreen
    />
  </div>
</template>

<!-- /bg-center flex justify-center items-center -->
<style scoped></style>
