<template>
  <aside class="lg:col-span-4 space-y-4">
    <!-- Faction Watch -->
    <div class="bg-white p-4 rounded-xl shadow-lg">
      <h3 class="font-serif text-xl font-bold mb-3 text-gray-900">
        Faction Watch
      </h3>
      <div class="space-y-3">
        <div class="border-b border-gray-200 pb-2">
          <div class="font-medium text-gray-600 mb-1">Most Active Faction</div>
          <div class="text-xl font-bold text-indigo-600">
            {{ mostActiveFaction }}
          </div>
        </div>
        <div class="space-y-3">
          <h4 class="font-bold text-gray-900">Data Detective Tips</h4>
          <ul class="space-y-2">
            <li class="flex items-start bg-gray-50 p-2">
              <span class="text-2xl mr-3">🔍</span>
              <span class="text-sm"
                >Track faction movements for pattern analysis</span
              >
            </li>
            <li class="flex items-start bg-gray-50 p-2">
              <span class="text-2xl mr-3">📊</span>
              <span class="text-sm">Compare health metrics across regions</span>
            </li>
            <li class="flex items-start bg-gray-50 p-2">
              <span class="text-2xl mr-3">🌟</span>
              <span class="text-sm"
                >Monitor social interactions between creatures</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Data Conditions card -->
    <div class="bg-white p-4 rounded-xl shadow-lg border-t-4 border-blue-500">
      <h3 class="font-serif text-xl font-bold mb-3 text-gray-900">
        Data Conditions
      </h3>
      <div class="space-y-2">
        <div class="flex justify-between items-center p-2">
          <span class="text-gray-600">Signal Strength:</span>
          <span class="font-bold text-green-600">Excellent</span>
        </div>
        <div class="flex justify-between items-center p-2">
          <span class="text-gray-600">Data Quality:</span>
          <span class="font-bold text-green-600">98%</span>
        </div>
        <div class="flex justify-between items-center p-2">
          <span class="text-gray-600">Network Status:</span>
          <span class="font-bold text-green-600">Online</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  mostActiveFaction: string;
}>();
</script>
