<template>
  <article class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="p-4">
      <div class="flex items-center space-x-3 mb-4">
        <div
          class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
        >
          <span class="text-xl">{{ icon }}</span>
        </div>
        <div>
          <h3 class="font-bold text-gray-900">{{ title }}</h3>
          <span class="text-sm text-gray-500">{{ timestamp }}</span>
        </div>
      </div>
      <div class="mt-4">
        <slot name="description"></slot>
      </div>

      <div v-if="videoUrl" class="mt-4">
        <div class="relative pb-[56.25%] h-0">
          <iframe
            class="absolute top-0 left-0 w-full h-full rounded-lg"
            :src="videoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div
        v-else-if="$slots.visualization"
        class="mt-4 data-visualization bg-white relative h-[420px] rounded-lg border border-gray-200"
      >
        <slot name="visualization"></slot>
      </div>

      <div class="border-t border-gray-100 pt-3 mt-4">
        <div class="mb-4 flex flex-wrap gap-2">
          <div
            v-for="(insight, index) in insights"
            :key="index"
            class="group relative inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-200 transition-colors"
          >
            <AlertCircleIcon class="h-4 w-4 text-gray-500" />
            <span class="text-sm text-gray-600">{{ insight }}</span>

            <div
              class="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
            >
              Explore this pattern in the data explorer
            </div>
          </div>
        </div>

        <slot name="stats"></slot>

        <div class="border-t border-gray-100 pt-4 mt-4">
          <PostActions :explore-text="exploreText" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { AlertCircleIcon } from "lucide-vue-next";
import PostActions from "./PostActions.vue";

defineProps<{
  icon: string;
  title: string;
  timestamp: string;
  insights: string[];
  exploreText: string;
  videoUrl?: string;
}>();
</script>
