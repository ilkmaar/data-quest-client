<template>
  <header
    class="rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 text-center bg-white"
  >
    <div class="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
      {{ currentDate }}
    </div>
    <h1
      class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight"
    >
      The Ilkmaar Explorer
    </h1>
    <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      <span class="text-xs sm:text-sm text-gray-600 font-serif"
        >Vol. XXIII</span
      >
      <span
        class="text-xs sm:text-sm bg-indigo-600 text-white px-3 py-1 rounded-full font-medium"
      >
        Data Science Edition
      </span>
      <span class="text-xs sm:text-sm text-gray-600">Price: 2 Coins</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);
</script>
