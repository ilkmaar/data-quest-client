<template>
  <div v-if="items && items.length">
      <!-- 
      <div style="width: 800px; height: 500px">
          <VueDataUi component="VueUiTable" :dataset="tableDataset" :config="tableConfig"></VueDataUi>
      </div>
      -->
      <table>
          <thead>
              <tr>
                  <th v-for="(value, key) in items[0]" :key="key">{{ key }}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="row in items" :key="row.id">
                  <td v-for="(value, key) in row" :key="key">{{ value }}</td>
              </tr>
          </tbody>
      </table>
  </div>
  <div v-else>
      <p>No data available. Run a query to see results.</p>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import { defineProps } from 'vue'
//import { VueDataUi } from 'vue-data-ui'
// import { useTableConfig } from '../composables/views/useTableConfig.js'

// const props =

defineProps({
  items: {
      type: Array,
      default: () => [],
  },
})

//const { tableConfig, tableDataset } = useTableConfig(ref(props.items))
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
