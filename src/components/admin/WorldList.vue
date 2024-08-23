<template>
  <div class="worlds-container">
      <h2 class="text-xl font-bold mb-4">Worlds</h2>
      <ul class="space-y-2 worlds-list">
          <li
              v-for="world in worlds"
              :key="world.id"
              @click="() => $emit('select', world)"
              class="cursor-pointer p-2 rounded hover:bg-gray-200"
              :class="{ 'bg-blue-100': selectedWorld?.id === world.id }"
          >
              {{ world.name }}
          </li>
      </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  worlds: Array,
  selectedWorld: Object,
})

defineEmits(['select'])
</script>

<style scoped>
.worlds-container {
  width: 100%;
  padding-right: 1rem;
}

.worlds-list {
  max-height: 300px; /* Adjust this height as needed */
  overflow-y: auto;
  padding-right: 0.5rem; /* Optional: for better scrollbar spacing */
}

.worlds-list::-webkit-scrollbar {
  width: 8px; /* Adjust scrollbar width if needed */
}

.worlds-list::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Customize scrollbar color */
  border-radius: 4px;
}

.worlds-list::-webkit-scrollbar-thumb:hover {
  background-color: #aaa; /* Darken on hover */
}
</style>