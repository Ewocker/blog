<script setup lang="ts"></script>

<template>
  <div class="w-full flex flex-col h-screen">
    <div class="bg-gray-100 p-6 lg:block hidden">
      <h1 class="text-2xl font-bold mb-1">Golf Launch Monitor Comparison</h1>
      <p class="text-gray-700">
        互動式高爾夫發球監測數據比較工具：橫跨 17 種球桿、男女、三種球技等級，
        比較球速、擊球效率、飛行距離、倒旋等關鍵數據。支援公制／英制切換與中英雙語，
        點擊任一數據名稱可查看定義與對擊球結果的影響。（所有數值皆為參考估計值。）
      </p>
    </div>
    <div class="flex-1 min-h-0 h-screen lg:h-auto">
      <iframe
        src="/golf-app/index.html"
        class="w-full h-full border-0"
        title="Golf Launch Monitor Comparison"
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
