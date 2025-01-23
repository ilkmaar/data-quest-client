import { ref, computed } from "vue";
import store from "../store";

export function useDashboardData() {
  const currentCreatureStats = computed(
    () => store.getters["world/currentCreatureStats"] || []
  );
  const creatureFactionStats = computed(
    () => store.getters["world/creatureFactionStats"] || []
  );
  const currentCreatureLocations = computed(
    () => store.getters["world/currentCreatureLocations"] || []
  );
  const creatureLocationHistory = computed(
    () => store.getters["world/creatureLocationHistory"] || []
  );
  const factionEngagementData = computed(
    () => store.getters["world/factionEngagementData"] || []
  );

  const stripPlotData = ref([
    {
      name: "Category 1",
      plots: [
        { name: "C1 P1", value: 10 },
        { name: "C1 P2", value: 20 },
        { name: "C1 P3", value: 30 },
      ],
    },
    {
      name: "Category 2",
      plots: [
        { name: "C2 P1", value: 15 },
        { name: "C2 P2", value: 20 },
      ],
    },
  ]);

  const stripPlotConfig = ref({
    responsive: false,
    theme: "",
    customPalette: [],
    useCssAnimation: true,
    userOptions: {
      show: true,
      position: "right",
      buttons: {
        tooltip: true,
        pdf: true,
        csv: true,
        img: true,
        table: true,
        labels: true,
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
        labels: "Toggle labels",
        fullscreen: "Toggle fullscreen",
        annotator: "Toggle annotator",
      },
    },
    style: {
      fontFamily: "inherit",
      chart: {
        backgroundColor: "#FFFFFFff",
        color: "#1A1A1Aff",
        height: 600,
        stripWidth: 120,
        padding: { top: 24, right: 24, bottom: 64, left: 64 },
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
          opacity: 0.5,
          radius: 20,
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
            fontSize: 14,
            color: "#1A1A1Aff",
            rounding: 0,
            offsetY: 0,
          },
          axis: {
            xLabel: "x Label",
            xLabelOffsetY: 0,
            yLabel: "y Label",
            yLabelOffsetX: 0,
            fontSize: 14,
            color: "#1A1A1Aff",
          },
          xAxisLabels: {
            show: true,
            color: "#1A1A1Aff",
            fontSize: 14,
            offsetY: 0,
          },
          yAxisLabels: {
            show: true,
            color: "#1A1A1Aff",
            fontSize: 14,
            rounding: 0,
            offsetX: 0,
          },
        },
        title: {
          text: "Title",
          color: "#1A1A1Aff",
          fontSize: 20,
          bold: true,
          textAlign: "center",
          paddingLeft: 0,
          paddingRight: 0,
          subtitle: {
            color: "#8A8A8Aff",
            text: "Subtitle",
            fontSize: 14,
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
    table: {
      show: false,
      responsiveBreakpoint: 300,
      columnNames: { series: "Series", value: "Value" },
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
      },
    },
  });

  const dashboardConfig = ref({
    locked: false,
    style: {
      board: {
        backgroundColor: "#FFFFFF",
        color: "#2D353C",
        aspectRatio: "1/1.4141",
        border: "1px solid #e1e5e8",
      },
      item: { backgroundColor: "#FFFFFF", borderColor: "#e1e5e8" },
      resizeHandles: { backgroundColor: "#2D353C", border: "none" },
    },
    allowPrint: true,
  });

  const dashboardDataset = ref([
    {
      width: 30,
      height: 20,
      left: 5,
      top: 5,
      component: "VueUiStripPlot",
      props: {
        dataset: stripPlotData.value,
        config: stripPlotConfig.value,
      },
    },
    // {
    //   width: 30,
    //   height: 20,
    //   left: 40,
    //   top: 5,
    //   component: "LocationHistoryPlot",
    //   props: {
    //     data: creatureLocationHistory.value,
    //   },
    // },
    // {
    //   width: 30,
    //   height: 20,
    //   left: 5,
    //   top: 30,
    //   component: "FactionEngagementPlot",
    //   props: {
    //     data: factionEngagementData.value,
    //   },
    // },
  ]);

  return {
    currentCreatureStats,
    creatureFactionStats,
    currentCreatureLocations,
    creatureLocationHistory,
    factionEngagementData,
    dataset: dashboardDataset.value,
    config: dashboardConfig.value,
  };
}
