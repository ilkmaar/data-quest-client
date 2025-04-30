<template>
  <Card class="w-full">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center p-4">
      <div
        class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"
      ></div>
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="p-4 text-sm text-red-600 text-center">
      Error loading foraging progress
    </div>

    <!-- Content when data is available -->
    <template v-else>
      <CardHeader class="pb-2">
        <CardTitle class="flex items-center gap-2 text-base">
          <Trophy class="h-4 w-4 text-yellow-500" />
          Foraging Level {{ currentLevel }}
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div v-for="level in levels" :key="level.id" class="relative">
          <div class="flex items-center gap-2 mb-1">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center text-sm"
              :class="{
                'bg-green-500': level.completed,
                'bg-blue-500': !level.completed && level.id <= currentLevel,
                'bg-gray-300': !level.completed && level.id > currentLevel,
              }"
            >
              <Lock
                v-if="level.id > currentLevel"
                class="w-3 h-3 text-gray-600"
              />
              <span v-else class="text-white">{{ level.id }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="text-sm font-medium truncate"
                :class="{
                  'text-gray-400': level.id > currentLevel,
                  'text-gray-900': level.id <= currentLevel,
                }"
              >
                {{ level.name }}
              </h3>
            </div>
            <div class="text-xs text-gray-600">
              {{ Math.round(level.progress * 100) }}%
            </div>
          </div>
          <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-300"
              :class="{
                'bg-green-500': level.completed,
                'bg-blue-500': !level.completed && level.id <= currentLevel,
                'bg-gray-300': !level.completed && level.id > currentLevel,
              }"
              :style="{ width: `${level.progress * 100}%` }"
            />
          </div>
        </div>
      </CardContent>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Trophy, Lock } from "lucide-vue-next";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardTitle from "@/components/ui/CardTitle.vue";
import CardContent from "@/components/ui/CardContent.vue";
import store from "../../store";

// State management
const isLoading = ref(false);
const hasError = ref(false);

const foragingProgress = computed(() => {
  return store.getters["world/playerProgressionData"];
});

// Compute current level from foraging progress data
const currentLevel = computed(() => {
  if (!foragingProgress.value) return 1;
  return foragingProgress.value.currentLevel || 1;
});

// Compute levels with progress from foraging progress data
const levels = computed(() => {
  if (!foragingProgress.value?.levels) return [];
  return foragingProgress.value.levels;
});

// Watch for data changes and handle loading states
watch(
  foragingProgress,
  (newData) => {
    try {
      isLoading.value = false;
      hasError.value = false;

      if (!newData) {
        hasError.value = true;
      }
    } catch (error) {
      console.error("Error processing foraging progress data:", error);
      hasError.value = true;
    }
  },
  { immediate: true }
);
</script>
