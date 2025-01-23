<template>
  <div class="map-container">
    <div class="map-legend">
      <div v-for="faction in factionOrder" :key="faction" class="legend-item">
        <div
          class="legend-color"
          :style="{ backgroundColor: factionColors[faction] }"
        ></div>
        <span>{{ faction }}</span>
      </div>
    </div>

    <div class="map-view">
      <VueUiScatter
        v-if="internalDataset"
        :dataset="internalDataset"
        :config="internalConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  VueUiScatter,
  VueUiScatterConfig,
  VueUiScatterDatasetItem,
} from "vue-data-ui";
import "vue-data-ui/style.css";
import { useDashboardData } from "../../composables/useDashboardData";
import { Ref } from "vue";

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

// Importing creature stats from composable
const { currentCreatureLocations } = useDashboardData();

// Reactive variables
const internalDataset = computed<VueUiScatterDatasetItem[]>(() => {
  console.log("Current Creature Locations:", currentCreatureLocations?.value);
  if (!currentCreatureLocations || !currentCreatureLocations.value) return [];
  const creatureData: Record<
    string,
    { x: number; y: number; name: string; color: string }[]
  > = {};

  // Populate creatureData based on selected metric
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

  console.log("Creature Data:", creatureData);
  // Order the dataset based on factionOrder to match the color palette
  const orderedDataset = factionOrder
    .filter((faction) => creatureData[faction])
    .map((faction) => ({
      name: faction,
      color: factionColors[faction],
      shape: factionShapes[faction],
      values: creatureData[faction],
    }));

  console.log("Ordered Dataset:", orderedDataset);
  return orderedDataset as VueUiScatterDatasetItem[];
});

const selectedMetric = ref<"health" | "social" | "mood">("health");

// Define faction order to ensure consistent color mapping
const factionOrder = ["Light", "Stability", "Growth", "Shadow"];

// Define color palette matching the faction order
const factionColors = {
  Light: "#FFFF00",
  Stability: "#808080",
  Growth: "#00FF00",
  Shadow: "#800080",
};

const factionShapes = {
  Light: "circle",
  Stability: "square",
  Growth: "triangle",
  Shadow: "diamond",
};

// Compute the color palette based on faction order
const colorPalette = computed(() =>
  factionOrder.map((faction) => factionColors[faction])
);

// Watch for changes in either currentCreatureStats or selectedMetric
watch(
  [currentCreatureLocations],
  () => {
    if (!currentCreatureLocations || !currentCreatureLocations.value) return;
    const creatureData: Record<
      string,
      { x: number; y: number; name: string }[]
    > = {};

    // Populate creatureData based on selected metric
    currentCreatureLocations.value.forEach((creature) => {
      if (!creatureData[creature.faction]) {
        creatureData[creature.faction] = [];
      }

      creatureData[creature.faction].push({
        x: creature.x,
        y: creature.y,
        name: creature.creatureName,
      });
    });

    // Order the dataset based on factionOrder to match the color palette
    const orderedDataset = factionOrder
      .filter((faction) => creatureData[faction])
      .map((faction) => ({
        name: faction,
        color: factionColors[faction],
        shape: factionShapes[faction],
        values: creatureData[faction],
      }));

    console.log("Ordered Dataset:", orderedDataset);
    internalDataset.value = orderedDataset;
  },
  { immediate: true }
);

// Configuration for the strip plot
const internalConfig = ref<VueUiScatterConfig>({
  table: {
    th: { backgroundColor: "#FFFFFF", color: "#1A1A1A" },
    td: { backgroundColor: "#FFFFFF", color: "#1A1A1A" },
  },
  style: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    layout: {
      axis: { stroke: "#CCCCCC" },
      dataLabels: { xAxis: { color: "#1A1A1A" }, yAxis: { color: "#1A1A1A" } },
      plots: {
        radius: 4,
        stroke: "#FFFFFF",
        selectors: {
          stroke: "#CCCCCC",
          labels: { color: "#1A1A1A" },
          markers: { fill: "#CCCCCC" },
        },
        // significance: { deviationThreshold: 30 },
      },
    },
    legend: { backgroundColor: "#FFFFFF", color: "#1A1A1A" },
    title: {
      text: "Current Creature Locations",
      color: "#1A1A1A",
      textAlign: "left",
      paddingLeft: 24,
      subtitle: { text: "Last known whereabouts." },
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      color: "#1A1A1A",
      borderColor: "#CCCCCC",
      backgroundOpacity: 30,
    },
  },
});

// Watch for changes in selectedMetric to update config labels and title
// Watch for changes in selectedMetric to update config labels and title
watch(selectedMetric, (newMetric) => {
  console.log("Selected Metric:", newMetric);

  // Guard clause if internalConfig is not defined
  if (!internalConfig) return;

  // Type-cast internalConfig to Ref<VueUiStripPlotConfig> if necessary
  const config = internalConfig as Ref<VueUiStripPlotConfig>;

  // Safely update internalConfig based on selectedMetricLabel
  if (config?.value?.style?.chart?.labels?.axis) {
    config.value.style.chart.labels.axis.yLabel = selectedMetricLabel.value;
  }

  config.value.style.chart.title.text = `Creature ${selectedMetricLabel.value}`;
  config.value.style.chart.title.subtitle.text = `Current ${selectedMetricLabel.value}`;
});
</script>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
}

.map-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
  padding: 0 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.map-view {
  flex: 1;
  min-height: 0;
  position: relative;
}

/* Make sure VueUiScatter takes full height of its container */
:deep(.vue-ui-scatter) {
  height: 100%;
  width: 100%;
}

/* Optional: Add some basic styling for the selector */
label {
  margin-right: 10px;
  font-weight: bold;
}

select {
  padding: 5px;
}
</style>
