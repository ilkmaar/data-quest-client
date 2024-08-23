<template>
  <aside class="world-selector">
    <h2 class="selector-title">Worlds</h2>
    <ul class="world-list">
      <li v-for="world in worlds" :key="world.id" class="world-item">
        <WorldItem
          :world="world"
          :isSelected="selectedWorld?.id === world.id"
          @select-world="selectWorld"
        />
      </li>
    </ul>
  </aside>
</template>

<script setup>
import WorldItem from './WorldItem.vue'

const props = defineProps({
  worlds: Array,
  selectedWorld: Object,
})

const emit = defineEmits(['select-world'])

const selectWorld = (world) => {
  emit('select-world', world)
}
</script>

<style scoped>
  .world-selector {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #f9fafb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    max-height: calc(100vh - var(--navbar-height) - var(--footer-height) );
    overflow-y: auto; /* Enable scrolling */
    flex: 1; /* Ensure it can grow and fill the available space */
  }

  .selector-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }

  .world-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .world-item {
    margin-bottom: 0.5rem;
  }
</style>