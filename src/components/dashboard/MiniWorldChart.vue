<template>
  <div class="mini-chart">
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      class="chart-svg"
    >
      <!-- Background Grid -->
      <g class="grid">
        <line
          v-for="i in 4"
          :key="`h-${i}`"
          class="grid-line"
          :x1="0"
          :x2="width"
          :y1="(height * i) / 4"
          :y2="(height * i) / 4"
        />
      </g>

      <!-- Sparkline -->
      <path
        :d="sparklinePath"
        class="sparkline"
        fill="none"
        :stroke="trendColor"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- Latest Value Dot -->
      <circle
        v-if="normalizedData.length"
        :cx="width"
        :cy="normalizedData[normalizedData.length - 1]"
        r="3"
        :fill="trendColor"
      />

      <!-- Trend Indicator -->
      <g class="trend-indicator" :transform="`translate(${width - 25}, 15)`">
        <path :d="trendArrow" :fill="trendColor" class="trend-arrow" />
      </g>
    </svg>

    <!-- Tooltip with latest value -->
    <div class="chart-tooltip" :style="{ color: trendColor }">
      {{ trend >= 0 ? "+" : "" }}{{ trend }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  data: number[];
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 120,
  height: 60,
});

// Normalize data to fit within SVG height
const normalizedData = computed(() => {
  if (!props.data.length) return [];

  const min = Math.min(...props.data);
  const max = Math.max(...props.data);
  const range = max - min || 1;

  return props.data.map(
    (value) => props.height - ((value - min) / range) * props.height
  );
});

// Calculate trend (percentage change)
const trend = computed(() => {
  if (props.data.length < 2) return 0;
  const first = props.data[0];
  const last = props.data[props.data.length - 1];
  return Math.round(((last - first) / first) * 100);
});

// Generate sparkline path
const sparklinePath = computed(() => {
  if (normalizedData.value.length < 2) return "";

  const points = normalizedData.value.map((y, i) => {
    const x = (i / (normalizedData.value.length - 1)) * props.width;
    return `${x},${y}`;
  });

  return `M ${points.join(" L ")}`;
});

// Determine color based on trend
const trendColor = computed(() => {
  if (trend.value > 0) return "#42b883"; // green for positive
  if (trend.value < 0) return "#ff6b6b"; // red for negative
  return "#666666"; // gray for neutral
});

// Generate trend arrow path
const trendArrow = computed(() => {
  if (trend.value > 0) {
    return "M0,8 L4,0 L8,8 L4,6 Z"; // up arrow
  }
  if (trend.value < 0) {
    return "M0,0 L4,8 L8,0 L4,2 Z"; // down arrow
  }
  return "M0,4 L8,4 M6,2 L8,4 L6,6"; // right arrow
});
</script>

<style scoped>
.mini-chart {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 8px;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.grid-line {
  stroke: #e1e5e8;
  stroke-width: 1;
  stroke-dasharray: 2;
}

.sparkline {
  transition: all 0.3s ease;
}

.trend-arrow {
  transition: all 0.3s ease;
}

.chart-tooltip {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
}

/* Hover effects */
.mini-chart:hover .sparkline {
  stroke-width: 3;
}

.mini-chart:hover .trend-arrow {
  transform: scale(1.2);
}
</style>
