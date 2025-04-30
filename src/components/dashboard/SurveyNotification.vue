<template>
  <div class="bg-indigo-50 border border-indigo-100 rounded-lg p-4 shadow-sm">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <span class="text-2xl">📊</span>
      </div>
      <div class="flex-1">
        <h3 class="font-medium text-indigo-900">Data Science and Me Survey</h3>
        <p class="mt-1 text-sm text-indigo-700">
          Help us understand how you interact with data! Take a moment to share
          how you interact with data in this optional survey.
        </p>
        <div class="mt-3 flex items-center justify-end space-x-4">
          <button
            @click="startSurvey"
            class="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Take Survey
          </button>
          <button
            @click="dismiss"
            class="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Remind me later
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["dismiss"]);

const startSurvey = () => {
  // TODO: Implement survey logic
  window.open("#", "_blank"); // Replace with actual survey URL
};

const dismiss = () => {
  emit("dismiss");
};
</script>
