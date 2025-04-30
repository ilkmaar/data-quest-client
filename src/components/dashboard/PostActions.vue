<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <button
        class="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <MessageCircleIcon class="h-5 w-5" />
        <span class="text-sm">Discuss</span>
      </button>

      <button
        class="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <Share2Icon class="h-5 w-5" />
        <span class="text-sm">Share findings</span>
      </button>
    </div>

    <button
      class="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
    >
      <SparklesIcon class="h-4 w-4" />
      <span class="text-sm font-medium">{{ exploreText }}</span>
      <ExternalLinkIcon class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  MessageCircleIcon,
  Share2Icon,
  SparklesIcon,
  ExternalLinkIcon,
} from "lucide-vue-next";

defineProps<{
  exploreText: string;
}>();
</script>
