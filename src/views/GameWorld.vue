<template>
  <VueUiDashboard :dataset="dataset" :config="config">
    <template #content="{ item }">
      <component :is="item.component" v-bind="item.props" />
    </template>
  </VueUiDashboard>

  <div class="dashboard-container space-y">
    <div class="grid grid-cols-3">
      <!-- Quick Stats -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title flex items-center gap-2">
            <span class="text-xl" role="img" aria-label="stats">📊</span>
            Active World Data
          </h2>
        </div>
        <div class="card-body space-y">
          <div class="stat-card stat-card-blue">
            <p class="stat-label">Active Players</p>
            <p class="stat-value">{{ currentPlayerLocations.length }}</p>
          </div>
          <div class="stat-card stat-card-green">
            <p class="stat-label">Total Creatures</p>
            <p class="stat-value">{{ currentCreatureLocations.length }}</p>
          </div>
          <div class="stat-card stat-card-purple">
            <p class="stat-label">Factions</p>
            <p class="stat-value">{{ currentFactionStats.length }}</p>
          </div>
        </div>
      </div>

      <!-- Current World Status -->
      <div>
        <!-- Alert Banner -->
        <div class="alert-critical">
          <div class="alert-content">
            <div class="alert-icon-group">
              <span class="text-2xl" role="img" aria-label="alert">⚠️</span>
              <div>
                <h2 class="alert-title">Critical Alert</h2>
                <p class="alert-message">
                  {{ criticalCases.length }} creatures in critical condition!
                  {{ urgentCases.length }} total creatures need attention.
                </p>
              </div>
            </div>
            <div class="alert-stats">
              <p class="alert-stats-label">Average Health</p>
              <p class="alert-stats-value">{{ averageHealth.toFixed(1) }}%</p>
            </div>
          </div>
        </div>
        <div class="card col-span-2">
          <div class="card-header">
            <h2 class="card-title">World Status - {{ worldName }}</h2>
          </div>
          <div class="card-body">
            <div class="chart-container">
              <BarChart
                :data="factionHealthData"
                :options="{
                  responsive: true,
                  maintainAspectRatio: false,
                }"
              >
                <Bar
                  label="Health"
                  :data="factionHealthData.map((f) => f.health)"
                  fill="#8884d8"
                />
                <Bar
                  label="Mood"
                  :data="factionHealthData.map((f) => f.mood)"
                  fill="#82ca9d"
                />
                <Bar
                  label="Social"
                  :data="factionHealthData.map((f) => f.social)"
                  fill="#ffc658"
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <!-- Your Progress -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Your Progress</h2>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <LineChart
              :data="progressionChartData"
              :options="{
                responsive: true,
                maintainAspectRatio: false,
              }"
            >
              <Line
                label="Progress"
                :data="progressionChartData.map((d) => d.progress)"
                :borderColor="'#8884d8'"
                :fill="false"
              />
              <Line
                label="Threshold"
                :data="progressionChartData.map((d) => d.threshold)"
                :borderColor="'#82ca9d'"
                :borderDash="[3, 3]"
                :fill="false"
              />
            </LineChart>
          </div>
          <div class="text-center">
            <p class="stat-label">
              Current Level: {{ playerProgressionData.currentLevel }} /
              {{ playerProgressionData.totalLevels }}
            </p>
          </div>
        </div>
      </div>

      <!-- Map Overview -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title flex items-center gap-2">
            <span class="text-xl" role="img" aria-label="map">🗺️</span>
            Active Locations
          </h2>
        </div>
        <div class="card-body">
          <div class="space-y">
            <div class="location-info">
              <h3 class="location-title">Hot Spots</h3>
              <p class="location-description">
                Most creatures are gathering in the northern regions. Players
                are concentrated around potion crafting stations.
              </p>
            </div>
            <div class="grid grid-cols-2">
              <div class="stat-card stat-card-yellow">
                <p class="stat-label">Active Areas</p>
                <p class="stat-value">{{ uniqueCreatureLocations }}</p>
              </div>
              <div class="stat-card stat-card-indigo">
                <p class="stat-label">Player Zones</p>
                <p class="stat-value">{{ uniquePlayerLocations }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Interface -->
    <div class="game-interface">
      <InteractiveGameMap />
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <h2 class="cta-title">Your Help is Needed, {{ playerName }}!</h2>
      <p class="cta-description">
        Join other healers in the magical realm to help restore health to our
        creatures.
      </p>
      <button @click="goToGame" class="cta-button">
        Enter the Magical Realm
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import store from "../store";
import InteractiveGameMap from "../components/game/InteractiveGameMap.vue";
import { VueUiDashboard } from "vue-data-ui";

const myXyConfig = {
  responsive: false,
  theme: "",
  axisLabelsFontSize: 12,
  backgroundColor: "#FFFFFF",
  barGap: 12,
  barAnimated: true,
  barStrokeWidth: 1,
  blurOnHover: true,
  chartIsBarUnderDatasetLength: 6,
  color: "#2D353C",
  customPalette: [],
  dataLabelFontSize: 14,
  dataLabelRoundingPercentage: 1,
  dataLabelRoundingValue: 0,
  donutHideLabelUnderPercentage: 3,
  donutLabelMarkerStrokeWidth: 1,
  donutRadiusRatio: 0.4,
  donutShowTotal: true,
  donutStrokeWidth: 2,
  donutThicknessRatio: 0.18,
  donutTotalLabelFontSize: 24,
  donutTotalLabelOffsetY: 0,
  donutTotalLabelText: "Total",
  donutUseShadow: false,
  donutShadowColor: "#2D353C",
  fontFamily: "inherit",
  formatter: null,
  height: 338,
  legendFontSize: 12,
  legendIcon: "circleFill",
  legendIconSize: 12,
  lineAnimated: true,
  lineSmooth: true,
  lineStrokeWidth: 2,
  paletteStartIndex: 0,
  showDataLabels: true,
  showLegend: true,
  showTooltip: true,
  showUserOptions: true,
  userOptionsPosition: "right",
  userOptionsButtons: {
    tooltip: true,
    pdf: true,
    img: true,
    fullscreen: true,
    annotator: true,
  },
  userOptionsButtonTitles: {
    open: "Open options",
    close: "Close options",
    tooltip: "Toggle tooltip",
    pdf: "Download PDF",
    img: "Download PNG",
    fullscreen: "Toggle fullscreen",
    annotator: "Toggle annotator",
  },
  title: "",
  titleBold: true,
  titleFontSize: 16,
  titleTextAlign: "center",
  tooltipCustomFormat: null,
  tooltipBackgroundOpacity: 100,
  tooltipBorderRadius: 4,
  tooltipBorderColor: "#e1e5e8",
  tooltipBorderWidth: 1,
  tooltipFontSize: 14,
  tooltipPosition: "center",
  tooltipOffsetY: 24,
  useCustomLegend: false,
  valuePrefix: "",
  valueSuffix: "",
  width: 512,
  xAxisLabel: "",
  xyAxisStroke: "#CCCCCC",
  xyAxisStrokeWidth: 1,
  xyGridStroke: "#e1e5e8",
  xyGridStrokeWidth: 0.5,
  xyHighlighterColor: "#2D353C",
  xyHighlighterOpacity: 0.05,
  xyLabelsXFontSize: 10,
  xyLabelsYFontSize: 12,
  xyPaddingBottom: 48,
  xyPaddingLeft: 48,
  xyPaddingRight: 12,
  xyPaddingTop: 24,
  xyPeriodLabelsRotation: 0,
  xyPeriods: [],
  xyScaleSegments: 15,
  xyShowAxis: true,
  xyShowGrid: true,
  xyShowScale: true,
  yAxisLabel: "",
  zoomXy: true,
  zoomColor: "#CCCCCC",
  zoomHighlightColor: "#4A4A4A",
  zoomFontSize: 14,
  zoomUseResetSlot: false,
  zoomMinimap: {
    show: false,
    smooth: false,
    selectedColor: "#1f77b4",
    selectedColorOpacity: 0.2,
    lineColor: "#2D353C",
    selectionRadius: 2,
    indicatorColor: "#2D353C",
  },
};

const config = {
  locked: false,
  style: {
    board: {
      backgroundColor: "#FFFFFF",
      color: "#CCCCCC",
      aspectRatio: "1/1.4141",
      border: "1px solid #e1e5e8",
    },
    item: { backgroundColor: "transparent", borderColor: "#e1e5e8" },
    resizeHandles: { backgroundColor: "#42d392", border: "none" },
  },
  allowPrint: false,
};

const worldName = computed(() => store.getters["world/currentWorldName"] || {});
const playerName = computed(
  () => store.getters["world/currentPlayerName"] || {}
);
const currentPlayerLocations = computed(
  () => store.getters["world/currentPlayerLocations"] || []
);
const currentCreatureLocations = computed(
  () => store.getters["world/currentCreatureLocations"] || []
);
const currentCreatureStats = computed(
  () => store.getters["world/currentCreatureStats"] || []
);
const currentFactionStats = computed(
  () => store.getters["world/currentFactionStats"] || []
);
const playerProgressionData = computed(
  () => store.getters["world/playerProgressionData"] || []
);

// Computed values for dashboard
const urgentCases = computed(
  () => currentCreatureStats.value.creatures?.filter((c) => c.health < 50) || []
);

const criticalCases = computed(() =>
  urgentCases.value.filter((c) => c.health < 25)
);

const averageHealth = computed(() => {
  const creatures = currentCreatureStats.value.creatures || [];
  return (
    creatures.reduce((acc, c) => acc + c.health, 0) / (creatures.length || 1)
  );
});

const factionHealthData = computed(() =>
  currentFactionStats.value.map((faction) => ({
    name: faction.factionName,
    health: faction.averageHealth,
    mood: faction.averageMood,
    social: faction.averageSocial,
  }))
);

const progressionChartData = computed(
  () =>
    playerProgressionData.value.levels?.map((level) => ({
      name: level.name,
      progress: level.progress,
      threshold: level.threshold,
    })) || []
);

const uniqueCreatureLocations = computed(
  () => new Set(currentCreatureLocations.value.map((c) => `${c.x},${c.y}`)).size
);

const uniquePlayerLocations = computed(
  () => new Set(currentPlayerLocations.value.map((p) => `${p.x},${p.y}`)).size
);

const dataset = [
  {
    width: 55,
    height: 25,
    left: 3,
    top: 2,
    component: "VueUiXy",
    props: {
      config: myXyConfig,
      dataset: currentCreatureLocations.value,
    },
  },
  // {
  //   width: 35,
  //   height: 25,
  //   left: 62,
  //   top: 2,
  //   component: "VueUiDonut",
  //   props: {
  //     config: myDonutConfig,
  //     dataset: myDonutDataset,
  //   },
  // },
];

const goToGame = () => {
  store.dispatch("world/goToWorld");
};
</script>

<style scoped>
/* Layout containers */
.dashboard-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
}

.space-y {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Grid layouts */
.grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .col-span-2 {
    grid-column: span 2;
  }
}

/* Card styles */
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.card-title {
  font-size: 1.125rem;
  font-weight: bold;
}

.card-body {
  padding: 1rem;
}

/* Alert banner */
.alert-critical {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
}

.alert-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert-icon-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: #991b1b;
}

.alert-message {
  color: #b91c1c;
}

.alert-stats {
  text-align: right;
}

.alert-stats-label {
  font-size: 0.875rem;
  color: #dc2626;
}

.alert-stats-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #991b1b;
}

/* Stat cards */
.stat-card {
  padding: 0.75rem;
  border-radius: 0.5rem;
}

.stat-card-blue {
  background-color: #eff6ff;
}

.stat-card-green {
  background-color: #f0fdf4;
}

.stat-card-purple {
  background-color: #f5f3ff;
}

.stat-label {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.stat-card-blue .stat-label {
  color: #2563eb;
}
.stat-card-blue .stat-value {
  color: #1e40af;
}
.stat-card-green .stat-label {
  color: #16a34a;
}
.stat-card-green .stat-value {
  color: #166534;
}
.stat-card-purple .stat-label {
  color: #7c3aed;
}
.stat-card-purple .stat-value {
  color: #5b21b6;
}

/* Chart containers */
.chart-container {
  height: 16rem;
  width: 100%;
}

/* Map section */
.location-info {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.location-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.location-description {
  font-size: 0.875rem;
  color: #4b5563;
}

/* Call to action */
.cta-section {
  background: linear-gradient(to right, #3b82f6, #7c3aed);
  color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
}

.cta-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.cta-description {
  margin-bottom: 1rem;
}

.cta-button {
  background: white;
  color: #7c3aed;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: #f5f3ff;
}

/* Game interface */
.game-interface {
  width: 80%;
  margin: 20px auto;
}

/* Utility classes */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.justify-between {
  justify-content: space-between;
}

.text-center {
  text-align: center;
}
</style>
