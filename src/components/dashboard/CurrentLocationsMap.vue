<template>
  <div class="absolute inset-0 flex flex-col p-2">
    <div class="flex-1 relative min-h-0">
      <VueUiScatter
        v-if="internalDataset"
        :dataset="internalDataset"
        :config="internalConfig"
        class="h-full w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  VueUiScatter,
  VueUiScatterConfig,
  VueUiScatterDatasetItem,
} from "vue-data-ui";
import "vue-data-ui/style.css";
import { useDashboardData } from "../../composables/useDashboardData";
import { useFactionStyles } from "../../composables/useFactionStyles";

defineProps({
  // Define the dataset prop
  dataset: {
    type: Array as () => VueUiScatterDatasetItem[],
    required: false,
  },
  // Define the config prop
  config: {
    type: Object as () => VueUiScatterConfig,
    required: false,
  },
});

// Importing creature stats and faction styles
const { currentCreatureLocations } = useDashboardData();
const { factionColors, factionShapes, factionOrder } = useFactionStyles();

// Reactive variables
const internalDataset = computed<VueUiScatterDatasetItem[]>(() => {
  if (!currentCreatureLocations?.value) return [];

  const creatureData: Record<
    string,
    { x: number; y: number; name: string; color: string }[]
  > = {};

  // Populate creatureData based on creature locations
  currentCreatureLocations.value.forEach((creature) => {
    if (!creatureData[creature.faction]) {
      creatureData[creature.faction] = [];
    }

    creatureData[creature.faction].push({
      x: creature.x,
      y: creature.y,
      name: creature.creatureName,
      color: factionColors[creature.faction],
    });
  });

  // Order the dataset based on factionOrder to match the color palette
  return factionOrder
    .filter((faction) => creatureData[faction])
    .map((faction) => ({
      name: faction,
      color: factionColors[faction],
      shape: factionShapes[faction],
      values: creatureData[faction],
    }));
});

// Compute the color palette based on faction order
const colorPalette = computed(() =>
  factionOrder.map((faction) => factionColors[faction])
);

// Configuration for the strip plot
const internalConfig = ref<VueUiScatterConfig>({
  table: {
    th: { backgroundColor: "#FFFFFF", color: "#1A1A1A" },
    td: { backgroundColor: "#FFFFFF", color: "#1A1A1A" },
  },
  customPalette: colorPalette.value,
  style: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    layout: {
      axis: { stroke: "#CCCCCC" },
      dataLabels: { xAxis: { color: "#1A1A1A" }, yAxis: { color: "#1A1A1A" } },
      plots: {
        radius: 5,
        stroke: "#FFFFFF",
        selectors: {
          stroke: "#CCCCCC",
          labels: { color: "#1A1A1A" },
          markers: { fill: "#CCCCCC" },
        },
        significance: { deviationThreshold: 300 },
      },
    },
    legend: { backgroundColor: "#FFFFFF", color: "#1A1A1A" },
    title: {
      text: "Current. Creature. Coordinates!",
      color: "#1A1A1A",
      textAlign: "left",
      paddingLeft: 24,
      subtitle: { text: "Last known whereabouts..." },
    },
  },
});
</script>

<style scoped>
/* We still need this style since it's targeting a deep child component */
:deep(.vue-ui-scatter) {
  height: 100%;
  width: 100%;
}
</style>
