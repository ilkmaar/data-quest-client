<template>
  <div class="data-browser-container">
      <div class="browser-section">
          <h1>1. Find Data:</h1>

          <div class="expandable-panel">
              <h2 @click="togglePanel('dataSourceBrowser')">A. Look for Data</h2>
              <div v-if="expandedPanels.dataSourceBrowser" class="panel-content">
                  <div class="tabs">
                      <button
                          v-for="type in queryTypes"
                          :key="type"
                          :class="{ active: activeTab === type }"
                          @click="activeTab = type"
                      >
                          {{ type }}
                      </button>
                  </div>
                  <div class="inventory">
                      <div
                          v-for="query in filteredQueries"
                          :key="query.name"
                          class="inventory-item"
                          @click="selectQuery(query)"
                          @mouseenter="showVariables(query)"
                          @mouseleave="hideVariables(query)"
                      >
                          <img :src="query.icon" alt="" class="item-icon" />
                          <div class="item-name">{{ query.name }}</div>
                          <div v-if="query.showVariables" class="variables-tooltip">
                              <div v-for="variable in query.variables" :key="variable.name">
                                  {{ variable.name }} ({{ variable.type }})
                              </div>
                          </div>
                          <button class="edit-icon" @click.stop="editVariables(query)">&#9998;</button>
                      </div>
                  </div>
              </div>
          </div>

          <div class="expandable-panel">
              <h2 @click="togglePanel('queryBuilder')">B. Build a Query</h2>
              <div v-if="expandedPanels.queryBuilder" class="panel-content">
                  <!-- Content for Query Builder -->
              </div>
          </div>
      </div>

      <div class="results-section">
          <div v-if="selectedQuery">
              <h2>{{ selectedQuery.name }} Variables</h2>
              <div v-for="variable in selectedQuery.variables" :key="variable.name">
                  <label :for="variable"> {{ variable.name }} ({{ variable.type }})</label>
                  <input
                      v-model="selectedQueryVariables[variable.name]"
                      :id="variable.name"
                      :type="getInputType(variable.type)"
                  />
              </div>
          </div>

          <button @click="runSelectedQuery">Run Query</button>
          <div v-if="loading">Loading...</div>
          <div v-if="error">Error: {{ error.message }}</div>
          <QueryResults v-if="!loading && !error" :result="result" />
      </div>
  </div>

  <VariablesModal v-if="editingQuery" @close="closeEditModal">
      <template v-slot:header>
          <h2>Edit Variables for {{ editingQuery.name }}</h2>
      </template>
      <template v-slot:body>
          <div v-for="variable in editingQuery.variables" :key="variable.name">
              <label :for="variable"> {{ variable.name }} ({{ variable.type }})</label>
              <input
                  v-model="selectedQueryVariables[variable.name]"
                  :id="variable.name"
                  :type="getInputType(variable.type)"
              />
          </div>
      </template>
      <template v-slot:footer>
          <button @click="saveEdit">Save</button>
      </template>
  </VariablesModal>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import useDataBrowser from '../../composables/useDataBrowser.js'
import QueryResults from './QueryResults.vue'
import VariablesModal from './VariablesModal.vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.state.player)
const worlds = computed(() => store.state.worlds)

const {
  queryTypes,
  activeTab,
  selectedQuery,
  selectedQueryVariables,
  filteredQueries,
  selectQuery,
  runSelectedQuery,
  loading,
  error,
  result,
} = useDataBrowser(user, worlds)

const getInputType = (type) => {
  switch (type) {
      case 'Int':
          return 'number'
      case 'ID':
          return 'text'
      default:
          return 'text'
  }
}

const expandedPanels = reactive({
  dataSourceBrowser: true,
  savedDatasets: false,
  queryBuilder: false,
})

const togglePanel = (panel) => {
  expandedPanels[panel] = !expandedPanels[panel]
}

const editingQuery = ref(null)

const showVariables = (query) => {
  if (query) {
      query.showVariables = true
  }
}

const hideVariables = (query) => {
  if (query) {
      query.showVariables = false
  }
}

const editVariables = (query) => {
  if (query) {
      editingQuery.value = query
  }
}

const closeEditModal = () => {
  editingQuery.value = null
}

const saveEdit = () => {
  // Implement saving logic
  editingQuery.value = null
}
</script>

<style scoped>
.data-browser-container {
  display: flex;
  height: 100vh;
}

.browser-section {
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.results-section {
  flex: 2;
  padding: 20px;
  overflow-y: auto;
}

.tabs {
  display: flex;
  margin-bottom: 10px;
}

.tabs button {
  padding: 10px;
  margin-right: 5px;
  border: none;
  cursor: pointer;
  background-color: #e0e0e0;
  transition: background-color 0.3s;
}

.tabs button.active,
.tabs button:hover {
  background-color: #ccc;
}

.inventory {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.inventory-item {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
}

.inventory-item:hover {
  background-color: #f0f0f0;
}

.item-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.item-name {
  font-size: 14px;
  font-weight: bold;
}

.variables-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
</style>
