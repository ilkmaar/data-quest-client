<template>
  <div style="width: 300px">
    <VueUiOnion :config="config" :dataset="dataset" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { VueUiOnion, type VueUiOnionConfig } from "vue-data-ui";
import "vue-data-ui/style.css";
import { useDashboardData } from "../../composables/useDashboardData";

// Define props
const props = defineProps<{
  creatureId: string;
  creatureName: string;
}>();

// Get creature stats from the store
const { currentCreatureStats } = useDashboardData();

// Create computed property to get the specific creature's data
const creatureData = computed(() => {
  return currentCreatureStats.value?.find(
    (creature) => creature.id === props.creatureId
  );
});

const dataset = computed(() => {
  if (!creatureData.value) return [];

  return [
    {
      name: "Health",
      percentage: Math.round(creatureData.value.health * 100),
      color: "#ff0019",
      value: Math.round(creatureData.value.health * 100),
      prefix: "",
      suffix: "%",
    },
    {
      name: "Mood",
      percentage: Math.round(creatureData.value.mood * 100),
      color: "#5dee60",
      value: Math.round(creatureData.value.mood * 100),
      prefix: "",
      suffix: "%",
    },
    {
      name: "Social",
      percentage: Math.round(creatureData.value.social * 100),
      color: "#a441d2",
      value: Math.round(creatureData.value.social * 100),
      prefix: "",
      suffix: "%",
    },
  ];
});

const config = computed<VueUiOnionConfig>(() => {
  return {
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    useStartAnimation: true,
    useBlurOnHover: true,
    style: {
      fontFamily: "inherit",
      chart: {
        backgroundColor: "#FFFFFFff",
        color: "#1A1A1Aff",
        useGradient: true,
        gradientIntensity: 20,
        layout: {
          maxThickness: 64,
          gutter: {
            color: "#e1e5e8ff",
            width: 0.62,
          },
          track: {
            width: 0.62,
          },
          labels: {
            show: true,
            fontSize: 14,
            color: "#1A1A1Aff",
            roundingValue: 0,
            roundingPercentage: 0,
            bold: true,
            offsetX: 0,
            offsetY: 0,
            value: {
              show: true,
              formatter: null,
            },
            percentage: {
              show: true,
            },
          },
        },
        title: {
          text: `${props.creatureName}'s Stats`,
          color: "#1A1A1Aff",
          fontSize: 20,
          bold: true,
          textAlign: "center",
          paddingLeft: 0,
          paddingRight: 0,
          subtitle: {
            color: "#A1A1A1ff",
            text: "",
            fontSize: 16,
            bold: false,
          },
        },
        legend: {
          show: true,
          bold: true,
          backgroundColor: "#FFFFFFff",
          color: "#1A1A1Aff",
          fontSize: 14,
          roundingValue: 0,
          roundingPercentage: 0,
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
          showValue: true,
          showPercentage: true,
          roundingValue: 0,
          roundingPercentage: 0,
        },
      },
    },
    userOptions: {
      show: true,
      showOnChartHover: false,
      keepStateOnChartLeave: true,
      position: "right",
      buttons: {
        tooltip: true,
        pdf: true,
        csv: true,
        img: true,
        table: true,
        labels: false,
        fullscreen: true,
        sort: false,
        stack: false,
        animation: false,
        annotator: true,
      },
      buttonTitles: {
        open: "Open options",
        close: "Close options",
        tooltip: "Toggle tooltip",
        pdf: "Download PDF",
        csv: "Download CSV",
        img: "Download PNG",
        table: "Toggle table",
        fullscreen: "Toggle fullscreen",
        annotator: "Toggle annotator",
      },
    },
    table: {
      show: false,
      responsiveBreakpoint: 400,
      th: {
        backgroundColor: "#FFFFFFff",
        color: "#1A1A1Aff",
        outline: "none",
      },
      td: {
        backgroundColor: "#FFFFFFff",
        color: "#1A1A1Aff",
        outline: "none",
        roundingValue: 0,
        roundingPercentage: 0,
      },
      translations: {
        value: "Value",
        percentage: "Percentage",
        serie: "Series",
      },
    },
  };
});
</script>
