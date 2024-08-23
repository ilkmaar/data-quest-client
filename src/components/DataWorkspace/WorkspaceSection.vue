<template>
  <div class="workspace-section">
      <h2>Workspace:</h2>
      <div v-if="!selectedNode" class="drop-zone">Click on a node to explore</div>
      <div v-else class="active-query">
          <h3>{{ selectedNode.label }}</h3>
          <div v-if="selectedNode.type === 'query'">
              <h4>Query Details:</h4>
              <pre>{{ getQueryDetails(selectedNode.id) }}</pre>
              <button @click="openVariablesModal(selectedNode.id)">Set Variables</button>
          </div>
          <div v-else>
              <h4>Entity: {{ selectedNode.label }}</h4>
              <p>Connected Queries:</p>
              <ul>
                  <li v-for="query in getConnectedQueries(selectedNode.id)" :key="query.id">
                      {{ query.label }}
                      <button @click="openVariablesModal(query.id)">Run Query</button>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  selectedNode: Object,
  getQueryDetails: Function,
  getConnectedQueries: Function,
})

const emit = defineEmits(['open-variables-modal'])

function openVariablesModal(queryId) {
  emit('open-variables-modal', queryId)
}
</script>

<style scoped>
.workspace-section {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-left: 1px solid #ccc;
  overflow-y: auto;
}

.drop-zone {
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #888;
}

.active-query {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}
</style>