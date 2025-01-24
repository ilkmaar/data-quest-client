<template>
  <div class="absolute inset-0 flex flex-col overflow-hidden">
    <!-- Metric selector moved to top -->
    <div
      class="flex justify-end items-center gap-3 p-2 border-b border-gray-100 bg-white shadow-sm z-10"
    >
      <label
        for="metric-select"
        class="text-sm font-medium text-gray-600 shrink-0"
      >
        Select Metric:
      </label>
      <select
        id="metric-select"
        v-model="selectedMetric"
        class="px-3 py-1.5 text-sm rounded-md border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
      >
        <option value="health">Health</option>
        <option value="social">Social</option>
        <option value="mood">Mood</option>
      </select>
    </div>

    <div class="flex-1 relative min-h-0 w-full">
      <!-- Loading state -->
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-white"
      >
        <div class="flex flex-col items-center gap-2">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"
          ></div>
          <span class="text-sm text-gray-600">Loading...</span>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="hasError"
        class="absolute inset-0 flex items-center justify-center bg-white"
      >
        <span class="text-sm text-red-600">Error loading data</span>
      </div>

      <!-- Data visualization -->
      <VueDataUi
        v-else-if="isDataValid"
        component="VueUiStripPlot"
        :dataset="internalDataset"
        :config="internalConfig"
        :style="chartStyle"
        class="absolute inset-0 p-1 m-2 mb-12"
      />

      <!-- No data state -->
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-white"
      >
        <span class="text-sm text-gray-600">No data available</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import {
  VueDataUi,
  type VueUiStripPlotDataset,
  type VueUiStripPlotConfig,
} from "vue-data-ui";
import "vue-data-ui/style.css";
import { useDashboardData } from "../../composables/useDashboardData";
import { useFactionStyles } from "../../composables/useFactionStyles";

// Importing creature stats from composable
const { currentCreatureStats } = useDashboardData();

// Replace the factionColors object with this:
const { factionColors } = useFactionStyles();

// Reactive variables
const internalDataset = ref<VueUiStripPlotDataset[]>([]);
const selectedMetric = ref<"health" | "social" | "mood">("health");

// Add new reactive variables for state management
const isLoading = ref(true);
const hasError = ref(false);

// Define faction order to ensure consistent color mapping
const factionOrder = ["Light", "Stability", "Growth", "Shadow"];

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

// Initialize chart dimensions with default values
const chartDimensions = ref({
  width: 200, // Default minimum width
  height: 200, // Default minimum height
});

// Add computed property for chart style
const chartStyle = computed(() => ({
  width: chartDimensions.value?.width
    ? `${chartDimensions.value.width}`
    : "100%",
  height: chartDimensions.value?.height
    ? `${chartDimensions.value.height}`
    : "100%",
}));

// Modify the internalConfig to include minimum dimensions
const internalConfig = ref<VueUiStripPlotConfig>({
  responsive: true,
  maintainAspectRatio: false,
  customPalette: colorPalette.value,
  style: {
    chart: {
      width: "100%",
      padding: { top: 0, right: 20, bottom: 50, left: 50 },
      backgroundColor: "#FFFFFFff",
      color: "#1A1A1Aff",
      grid: {
        show: true,
        stroke: "#E5E7EB",
        strokeWidth: 1,
        scaleSteps: 6,
        horizontalGrid: {
          show: true,
          stroke: "#E5E7EB",
          strokeWidth: 1,
          strokeDasharray: 2,
        },
        verticalGrid: {
          show: false,
        },
      },
      plots: {
        opacity: 0.85,
        radius: 4,
        stroke: "#FFFFFFff",
        strokeWidth: 1,
        shape: "circle",
        gradient: { show: true, intensity: 50 },
      },
      labels: {
        prefix: "",
        suffix: "",
        formatter: null,
        bestPlotLabel: {
          show: true,
          showValue: true,
          fontSize: 11,
          color: "#374151",
          rounding: 0,
          offsetY: -8,
        },
        axis: {
          xLabel: "Faction",
          xLabelOffsetY: 45,
          yLabel: selectedMetricLabel.value,
          yLabelOffsetX: -45,
          fontSize: 12,
          color: "#374151",
        },
        xAxisLabels: {
          show: true,
          color: "#4B5563",
          fontSize: 11,
          offsetY: 6,
        },
        yAxisLabels: {
          show: true,
          color: "#4B5563",
          fontSize: 11,
          rounding: 0,
          offsetX: 0,
        },
      },
      title: {
        text: `Creature ${selectedMetricLabel.value}`,
        color: "#111827",
        fontSize: 18,
        bold: true,
        textAlign: "center",
        subtitle: {
          color: "#6B7280",
          text: `Current ${selectedMetricLabel.value}`,
          fontSize: 11,
          bold: false,
        },
      },
      tooltip: {
        show: true,
        color: "#1A1A1A",
        backgroundColor: "#FFFFFF",
        fontSize: 12,
        customFormat: null,
        borderRadius: 6,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        backgroundOpacity: 95,
        position: "center",
        offsetY: 8,
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

// Modify the watch to include better error handling
watch(
  [currentCreatureStats, selectedMetric],
  () => {
    try {
      isLoading.value = true;
      hasError.value = false;

      if (!currentCreatureStats.value?.length) {
        internalDataset.value = [];
        return;
      }

      const creatureData: Record<string, { name: string; value: number }[]> =
        {};

      // Validate and process each creature's data
      currentCreatureStats.value.forEach((creature) => {
        if (!creature.faction) return;

        if (!creatureData[creature.faction]) {
          creatureData[creature.faction] = [];
        }

        let value: number;
        switch (selectedMetric.value) {
          case "health":
            value =
              creature.health != null ? Math.floor(100 * creature.health) : 0;
            break;
          case "social":
            value =
              creature.social != null ? Math.floor(100 * creature.social) : 0;
            break;
          case "mood":
            value = creature.mood != null ? Math.floor(100 * creature.mood) : 0;
            break;
          default:
            value = 0;
        }

        // Only add the creature if it has valid data
        if (!isNaN(value) && creature.creatureName) {
          creatureData[creature.faction].push({
            name: creature.creatureName,
            value: value,
          });
        }
      });

      // Filter out empty factions and create the dataset
      const orderedDataset: VueUiStripPlotDataset[] = factionOrder
        .filter((faction) => creatureData[faction]?.length > 0)
        .map((faction) => ({
          name: faction,
          plots: creatureData[faction],
        }));

      internalDataset.value = orderedDataset;
    } catch (error) {
      console.error("Error processing creature data:", error);
      hasError.value = true;
      internalDataset.value = [];
    } finally {
      isLoading.value = false;
    }
  },
  { immediate: true }
);

// Modify the resize observer code to use numeric values for chart config
onMounted(() => {
  const container = document.querySelector(".flex-1.relative");
  if (container) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        // Update dimensions only if they're valid numbers
        if (width > 0 && height > 0) {
          chartDimensions.value = {
            width: Math.max(width, 200),
            height: Math.max(height, 200),
          };

          // Update chart config dimensions with numeric values (no px)
          if (internalConfig.value?.style?.chart) {
            internalConfig.value.style.chart.width =
              chartDimensions.value.width;
            internalConfig.value.style.chart.height =
              chartDimensions.value.height;
          }
        }
      }
    });

    resizeObserver.observe(container);

    // Trigger initial resize
    const { width, height } = container.getBoundingClientRect();
    if (width > 0 && height > 0) {
      chartDimensions.value = {
        width: Math.max(width, 200),
        height: Math.max(height, 200),
      };

      // Set initial chart config dimensions
      if (internalConfig.value?.style?.chart) {
        internalConfig.value.style.chart.width = chartDimensions.value.width;
        internalConfig.value.style.chart.height = chartDimensions.value.height;
      }
    }

    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  }
});

// Modify the isDataValid computed property to include dimension validation
const isDataValid = computed(() => {
  return (
    currentCreatureStats.value?.length > 0 &&
    internalDataset.value?.length > 0 &&
    internalDataset.value.every(
      (dataset) =>
        dataset.plots?.length > 0 &&
        dataset.plots.every(
          (plot) =>
            typeof plot.value === "number" &&
            !isNaN(plot.value) &&
            Number.isFinite(plot.value)
        )
    ) &&
    chartDimensions.value.width > 0 &&
    chartDimensions.value.height > 0
  );
});
</script>
