<template>
  <div
    class="bg-gradient-to-r from-red-600 to-red-700 shadow-lg mb-4 sm:mb-6 lg:mb-8 rounded-xl overflow-hidden"
  >
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="flex items-center mb-3 sm:mb-4">
        <span
          class="bg-white/20 text-white text-xs sm:text-sm px-3 py-1 rounded-full backdrop-blur-sm font-medium"
        >
          🚨 URGENT ALERT
        </span>
      </div>
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
      >
        <div class="space-y-2 sm:space-y-3">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            World Health Crisis
          </h2>
          <p class="text-sm sm:text-base text-white/90">
            World health has dropped to
            <span class="font-bold">{{ worldHealth }}%</span>. Your data science
            expertise is needed immediately!
          </p>
        </div>
        <button
          @click="$emit('join')"
          :disabled="loading"
          class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-md text-base sm:text-lg flex items-center justify-center gap-2"
        >
          <span>{{ loading ? "Loading..." : "Play Now" }}</span>
          <span v-if="!loading" class="text-xl">🎮</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  worldHealth: number;
  loading: boolean;
}>();

defineEmits<{
  (e: "join"): void;
}>();
</script>
