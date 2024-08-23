<template>
  <div v-if="result && Object.keys(result).length">
      <div v-for="key in keys" :key="key">
          <h2>{{ key }}</h2>
          <div v-if="Array.isArray(result[key])">
              <QueryResultTable :items="result[key]" />
          </div>
          <div v-else>
              <table>
                  <tbody>
                      <tr>
                          <td>
                              <strong>{{ key }}:</strong>
                          </td>
                          <td>{{ formatValue(result[key]) }}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
  <div v-else>
      <p>No data available. Run a query to see results.</p>
  </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue'
import QueryResultTable from './QueryResultTable.vue'

const props = defineProps({
  result: {
      type: Object,
      default: () => ({}),
  },
})

const keys = ref([])

watch(
  () => props.result,
  (newResult) => {
      console.log('QueryResults view result:', newResult)
      if (newResult && typeof newResult === 'object') {
          keys.value = Object.keys(newResult)
      } else {
          keys.value = []
      }
  },
  { immediate: true, deep: true },
)

const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2)
  }
  return value
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
}

td:first-child {
  font-weight: bold;
  width: 20%;
}
</style>