<template>
  <div class="data-workspace-container">
      <LoadingSpinner v-if="isLoading" />
      <ErrorSection v-else-if="loadError" :message="loadError" />
      <template v-else>
          <DataSourceBrowser />
          <!-- <DataGraph
              ref="graphContainer"
              :graphData="graphData"
              :selectedNodes="selectedNodes"
              @node-click="onNodeClick"
          /> -->
          <WorkspaceSection
              :selectedNode="selectedNode"
              :getQueryDetails="getQueryDetails"
              :getConnectedQueries="getConnectedQueries"
              @open-variables-modal="openVariablesModal"
          />
      </template>
  </div>

  <VariablesModal
      v-if="showVariablesModal"
      :node="selectedQueryNode"
      :variables="queryVariables"
      @close="closeVariablesModal"
      @run-query="runQuery"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import ErrorSection from '../components/common/ErrorSection.vue'
import VariablesModal from '../components/DataWorkspace/VariablesModal.vue'
import WorkspaceSection from '../components/DataWorkspace/WorkspaceSection.vue'
    import DataSourceBrowser from '../components/DataWorkspace/DataSourceBrowser.vue'
import creatureStatsQueries from '@/graphql/queries'
import { dataModel } from '../config/dataModel.js'

const graphContainer = ref(null)
const selectedNodes = ref([])
const selectedNode = ref(null)
const selectedQueryNode = ref(null)
const showVariablesModal = ref(false)
const queryVariables = ref({})
const isLoading = ref(false)
const loadError = ref(null)
const queryResult = ref(null)
const graphData = ref(JSON.parse(JSON.stringify(dataModel)))

const visibleGraph = computed(() => getVisibleGraph(selectedNodes.value))

watch(
  visibleGraph,
  () => {
      if (graphContainer.value) {
          //graphContainer.value?.updateGraph()
      }
  },
  { deep: true },
)

// function onNodeClick(node) {
//     const index = selectedNodes.value.findIndex((n) => n.id === node.id)
//     if (index !== -1) {
//         selectedNodes.value.splice(index, 1)
//     } else {
//         selectedNodes.value.push(node)
//         const connectedNodes = graphData.value.edges
//             .filter((edge) => edge.source === node.id || edge.target === node.id)
//             .map((edge) => (edge.source === node.id ? edge.target : edge.source))
//             .map((id) => graphData.value.nodes.find((n) => n.id === id))
//         selectedNodes.value.push(...connectedNodes)
//     }
//     selectedNode.value = selectedNodes.value.length > 0 ? selectedNodes.value[selectedNodes.value.length - 1] : null
//     if (graphContainer.value) {
//         //graphContainer.value?.updateGraph()
//     }
// }

function getVisibleGraph(selectedNodeIds) {
  const visibleNodes = graphData.value.nodes.filter(
      (node) => node.level === 1 || selectedNodeIds.some((n) => n.id === node.id),
  )
  const visibleNodeIds = visibleNodes.map((node) => node.id)
  const visibleEdges = graphData.value.edges.filter(
      (edge) => visibleNodeIds.includes(edge.source) && visibleNodeIds.includes(edge.target),
  )
  return { nodes: visibleNodes, edges: visibleEdges }
}

function getQueryDetails(queryId) {
  const query = creatureStatsQueries.find((q) => q.name === queryId)
  return query ? JSON.stringify(query, null, 2) : 'Query not found'
}

function getConnectedQueries(entityId) {
  return graphData.value.edges
      .filter(
          (edge) =>
              edge.target === entityId && graphData.value.nodes.find((n) => n.id === edge.source).type === 'query',
      )
      .map((edge) => graphData.value.nodes.find((node) => node.id === edge.source))
}

function openVariablesModal(queryId) {
  selectedQueryNode.value = graphData.value.nodes.find((node) => node.id === queryId)
  queryVariables.value = {}
  showVariablesModal.value = true
}

function closeVariablesModal() {
  showVariablesModal.value = false
}

async function runQuery(variables) {
  isLoading.value = true
  loadError.value = null
  queryResult.value = null

  try {
      const query = creatureStatsQueries.find((q) => q.name === selectedQueryNode.value.id)
      if (!query) throw new Error('Query not found')

      await new Promise((resolve) => setTimeout(resolve, 1000))
      queryResult.value = {
          data: `Simulated query result for ${selectedQueryNode.value.id}`,
          variables: variables,
      }
  } catch (err) {
      loadError.value = err.message || 'An error occurred while running the query'
  } finally {
      isLoading.value = false
      showVariablesModal.value = false
  }
}

onMounted(() => {
  if (graphContainer.value) {
      graphContainer.value.createGraph()
  }
})
</script>

<style scoped>
.data-workspace-container {
  display: flex;
  height: 100vh;
}
</style>