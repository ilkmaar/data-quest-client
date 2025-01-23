<template>
  <div class="plot-container">
    <div class="strip-plot-view">
      <VueDataUi
        component="VueUiStripPlot"
        :dataset="internalDataset"
        :config="internalConfig"
      />
    </div>

    <div class="metric-selector">
      <label for="metric-select">Select Metric:</label>
      <select id="metric-select" v-model="selectedMetric">
        <option value="health">Health</option>
        <option value="social">Social</option>
        <option value="mood">Mood</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  VueDataUi,
  type VueUiStripPlotDataset,
  type VueUiStripPlotConfig,
} from "vue-data-ui";
import "vue-data-ui/style.css";
import { useDashboardData } from "../../composables/useDashboardData";

// Define props if necessary
defineProps({
  dataset: {
    type: Array as () => VueUiStripPlotDataset[],
    required: false,
  },
  config: {
    type: Object as () => VueUiStripPlotConfig,
    required: false,
  },
});

// Importing creature stats from composable
const { currentCreatureStats } = useDashboardData();

// Reactive variables
const internalDataset = ref<VueUiStripPlotDataset[]>([]);
const selectedMetric = ref<"health" | "social" | "mood">("health");

// Define faction order to ensure consistent color mapping
const factionOrder = ["Light", "Stability", "Growth", "Shadow"];

// Define color palette matching the faction order
const factionColors = {
  Light: "yellow",
  Stability: "grey",
  Growth: "green",
  Shadow: "purple",
};

// Compute the color palette based on faction order
const colorPalette = computed(() =>
  factionOrder.map((faction) => factionColors[faction])
);

// Compute label for the selected metric
const selectedMetricLabel = computed(() => {
  switch (selectedMetric.value) {
    case "health":
      return "Health";
    case "social":
      return "Social";
    case "mood":
      return "Mood";
    default:
      return "";
  }
});

// Watch for changes in either currentCreatureStats or selectedMetric
watch(
  [currentCreatureStats, selectedMetric],
  () => {
    const creatureData: Record<string, { name: string; value: number }[]> = {};

    // Populate creatureData based on selected metric
    currentCreatureStats.value.forEach((creature) => {
      if (!creatureData[creature.faction]) {
        creatureData[creature.faction] = [];
      }

      // Determine the value based on selected metric
      let value: number;
      switch (selectedMetric.value) {
        case "health":
          value = Math.floor(100 * (creature.health ?? 0));
          break;
        case "social":
          value = Math.floor(100 * (creature.social ?? 0));
          break;
        case "mood":
          value = Math.floor(100 * (creature.mood ?? 0));
          break;
        default:
          value = 0;
      }

      creatureData[creature.faction].push({
        name: creature.creatureName as string,
        value: value,
      });
    });

    // Order the dataset based on factionOrder to match the color palette
    const orderedDataset: VueUiStripPlotDataset[] = factionOrder
      .filter((faction) => creatureData[faction])
      .map((faction) => ({
        name: faction,
        plots: creatureData[faction] as { name: string; value: number }[],
      }));

    internalDataset.value = orderedDataset;
  },
  { immediate: true }
);

// Configuration for the strip plot
const internalConfig = ref<VueUiStripPlotConfig>({
  responsive: true,
  theme: "",
  customPalette: colorPalette.value,
  useCssAnimation: false,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#FFFFFFff",
      color: "#1A1A1Aff",
      padding: { top: 30, right: 30, bottom: 50, left: 70 },
      grid: {
        show: true,
        stroke: "#CCCCCCff",
        strokeWidth: 1,
        scaleSteps: 10,
        horizontalGrid: {
          show: true,
          stroke: "#CCCCCCff",
          strokeWidth: 0.5,
          strokeDasharray: 4,
        },
        verticalGrid: {
          show: true,
          stroke: "#CCCCCCff",
          strokeWidth: 0.5,
          strokeDasharray: 4,
        },
      },
      plots: {
        opacity: 0.8,
        radius: 5,
        stroke: "#FFFFFFff",
        strokeWidth: 1,
        shape: "circle",
        gradient: { show: true, intensity: 40 },
      },
      labels: {
        prefix: "",
        suffix: "",
        formatter: null,
        bestPlotLabel: {
          show: true,
          showValue: true,
          fontSize: 12,
          color: "#1A1A1Aff",
          rounding: 0,
          offsetY: 10,
        },
        axis: {
          xLabel: "Faction",
          xLabelOffsetY: 35,
          yLabel: selectedMetricLabel.value,
          yLabelOffsetX: -45,
          fontSize: 13,
          color: "#1A1A1Aff",
        },
        xAxisLabels: {
          show: true,
          color: "#1A1A1Aff",
          fontSize: 12,
          offsetY: 15,
        },
        yAxisLabels: {
          show: true,
          color: "#1A1A1Aff",
          fontSize: 12,
          rounding: 0,
          offsetX: -10,
        },
      },
      title: {
        text: `Creature ${selectedMetricLabel.value}`,
        color: "#1A1A1Aff",
        fontSize: 16,
        bold: true,
        textAlign: "center",
        paddingTop: 10,
        subtitle: {
          color: "#8A8A8Aff",
          text: `Current ${selectedMetricLabel.value}`,
          fontSize: 12,
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#1A1A1Aff",
        backgroundColor: "#FFFFFFff",
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
        roundingValue: 0,
      },
    },
  },
});

// Watch for changes in selectedMetric to update config labels and title
watch(selectedMetric, (newMetric) => {
  console.log("Selected Metric:", newMetric);

  // Guard clause if internalConfig is not defined
  if (!internalConfig) return;

  // Safely update internalConfig based on selectedMetricLabel
  internalConfig.value.style.chart.labels.axis.yLabel =
    selectedMetricLabel.value;
  internalConfig.value.style.chart.title.text = `Creature ${selectedMetricLabel.value}`;
  internalConfig.value.style.chart.title.subtitle.text = `Current ${selectedMetricLabel.value}`;
});
</script>

<style scoped>
.plot-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.strip-plot-view {
  flex: 1;
  min-height: 0;
  position: relative;
  width: 100%;
}

/* Make sure VueDataUi takes full height of its container */
:deep(.vue-data-ui) {
  height: 100%;
  width: 100%;
}

:deep(.vue-data-ui svg) {
  height: 100%;
  width: 100%;
  max-height: calc(100vh - 300px); /* Prevent excessive height */
}

.metric-selector {
  padding: 8px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  background: #f8f9fa;
  border-top: 1px solid #e1e5e8;
  margin-top: auto; /* Push to bottom */
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #e1e5e8;
  font-size: 0.9rem;
}
</style>
