<template>
  <div class="relative">
      <input
          type="text"
          :placeholder="placeholder"
          v-model="search"
          @input="filterItems"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <ul
          v-if="filteredItems.length > 0"
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
          <li
              v-for="item in filteredItems"
              :key="item[itemValue]"
              @click="selectItem(item)"
              class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
          >
              {{ item[itemText] }}
          </li>
      </ul>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
      type: Array,
      required: true,
  },
  itemText: {
      type: String,
      default: 'text',
  },
  itemValue: {
      type: String,
      default: 'value',
  },
  placeholder: {
      type: String,
      default: '',
  },
})

const emit = defineEmits(['item-selected'])

const search = ref('')
const filteredItems = ref([])

const filterItems = () => {
  filteredItems.value = props.items.filter(
      (item) =>
          item[props.itemText].toLowerCase().includes(search.value.toLowerCase()) ||
          item[props.itemValue].toString().toLowerCase().includes(search.value.toLowerCase()),
  )
}

const selectItem = (item) => {
  search.value = item[props.itemText]
  emit('item-selected', item)
  filteredItems.value = []
}

watch(() => props.items, filterItems, { immediate: true })
</script>
