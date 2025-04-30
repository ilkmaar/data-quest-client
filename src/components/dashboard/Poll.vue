<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Header section matching SocialPost -->
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <span
            class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-500 text-xl animate-pulse"
          >
            {{ icon }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900">
            {{ postedBy }}
          </p>
          <p class="text-sm text-gray-500">
            {{ timestamp }}
          </p>
        </div>
      </div>
    </div>

    <!-- Poll content -->
    <div class="p-4">
      <div v-if="!hasVoted" class="space-y-4">
        <!-- Question with highlight -->
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 class="font-medium text-blue-900 mb-2">{{ question }}</h3>
          <p class="text-sm text-blue-600">
            Your input helps us understand the situation better! 🤔
          </p>
        </div>

        <!-- Options with enhanced styling -->
        <div class="space-y-2">
          <button
            v-for="(option, index) in options"
            :key="index"
            @click="vote(index)"
            class="w-full text-left px-4 py-3 rounded-md border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-150 group"
            :class="{
              'border-blue-500 bg-blue-50': selectedOption === index,
              'transform hover:scale-[1.01]': selectedOption !== index,
            }"
          >
            <div class="flex items-center">
              <div class="flex-1">{{ option.text }}</div>
              <div
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
                :class="
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 group-hover:border-blue-500'
                "
              >
                <svg
                  v-if="selectedOption === index"
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <button
          @click="submitVote"
          :disabled="selectedOption === null"
          class="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-150 hover:scale-[1.02] font-medium text-lg shadow-md hover:shadow-lg disabled:hover:scale-100"
        >
          Cast Your Vote
        </button>
      </div>

      <div v-else class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 class="font-medium text-green-900 mb-2">Thanks for voting!</h3>
          <p class="text-sm text-green-600">Here's how others voted:</p>
        </div>

        <div class="space-y-3">
          <div v-for="(option, index) in options" :key="index" class="relative">
            <div class="flex justify-between mb-1">
              <span
                class="text-sm font-medium"
                :class="{
                  'text-blue-600': index === selectedOption,
                  'text-gray-600': index !== selectedOption,
                }"
              >
                {{ option.text }}
              </span>
              <span
                class="text-sm font-medium"
                :class="{
                  'text-blue-600': index === selectedOption,
                  'text-gray-900': index !== selectedOption,
                }"
              >
                {{ Math.round((option.votes / totalVotes) * 100) }}%
              </span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-3">
              <div
                class="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                :class="{
                  'bg-blue-600': index === selectedOption,
                  'bg-gray-400': index !== selectedOption,
                }"
                :style="{ width: `${(option.votes / totalVotes) * 100}%` }"
              >
                <div
                  v-if="index === selectedOption"
                  class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <p
          class="text-sm text-gray-500 mt-3 flex items-center justify-center space-x-2"
        >
          <span>{{ totalVotes }} votes</span>
          <span>•</span>
          <span>Poll ends in {{ timeLeft }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface PollOption {
  text: string;
  votes: number;
}

const props = defineProps<{
  question: string;
  options: PollOption[];
  duration?: string;
  icon?: string;
  postedBy?: string;
  timestamp?: string;
}>();

const selectedOption = ref<number | null>(null);
const hasVoted = ref(false);

const totalVotes = computed(() => {
  return props.options.reduce((sum, option) => sum + option.votes, 0);
});

// This would normally come from your backend
const timeLeft = ref("23 hours");

const vote = (index: number) => {
  selectedOption.value = index;
};

const submitVote = () => {
  if (selectedOption.value === null) return;

  // In a real application, you would send this to your backend
  props.options[selectedOption.value].votes++;
  hasVoted.value = true;
};
</script>
