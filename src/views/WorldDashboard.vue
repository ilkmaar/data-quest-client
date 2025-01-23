<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
    <!-- Masthead -->
    <header
      class="text-center border-b-4 border-double border-gray-900 pb-4 mb-8"
    >
      <div class="text-sm text-gray-600 mb-2">{{ currentDate }}</div>
      <h1 class="newspaper-title">The Ilkmaar Observer</h1>
      <div class="flex items-center justify-center space-x-4 mt-2">
        <span class="text-sm text-gray-600">Vol. XXIII</span>
        <span class="text-sm bg-gray-900 text-white px-3 py-1"
          >Data Science Edition</span
        >
        <span class="text-sm text-gray-600">Price: 2 Credits</span>
      </div>
    </header>

    <!-- Breaking News Banner -->
    <div
      class="bg-red-700 text-white py-2 px-4 rounded-lg mb-8 flex items-center justify-between"
    >
      <div class="flex items-center">
        <span class="font-bold mr-2">BREAKING:</span>
        <span
          >World Health Crisis at {{ worldHealth }}% - Join Investigation
          Now!</span
        >
      </div>
      <button
        @click="joinWorld"
        :disabled="loading"
        class="px-4 py-1 bg-white text-red-700 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        {{ loading ? "Loading..." : "Join Investigation" }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Main Column -->
      <div class="lg:col-span-8 space-y-8">
        <!-- Lead Story -->
        <article class="border-b border-gray-200 pb-8">
          <h2 class="article-title mb-4">
            Creature Health Crisis: A Deep Dive Analysis
          </h2>
          <p class="article-lead mb-6">
            Our data scientists have uncovered concerning patterns in creature
            health across all factions. The following visualization reveals the
            full scope of the situation.
          </p>
          <div class="data-visualization">
            <CreatureHealthStripPlot />
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-blue-800">
                {{ totalCreatures }}
              </div>
              <div class="text-sm text-gray-600">Active Creatures</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-blue-800">
                {{ activeFactions }}
              </div>
              <div class="text-sm text-gray-600">Active Factions</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-blue-800">
                {{ highestHealth }}%
              </div>
              <div class="text-sm text-gray-600">Peak Health</div>
            </div>
          </div>
        </article>

        <!-- Secondary Story -->
        <article>
          <h2 class="article-title mb-4">Unusual Movement Patterns Detected</h2>
          <p class="article-lead mb-6">
            Latest satellite data shows unprecedented creature gatherings in key
            locations. Our interactive map reveals potential hotspots of
            activity.
          </p>
          <div class="data-visualization">
            <CurrentLocationsMap />
          </div>
        </article>
      </div>

      <!-- Sidebar -->
      <aside class="lg:col-span-4 space-y-6">
        <!-- Faction Watch -->
        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 class="font-serif text-xl font-bold mb-4">Faction Watch</h3>
          <div class="space-y-4">
            <div class="border-b border-gray-200 pb-2">
              <div class="font-bold">Most Active Faction</div>
              <div class="text-lg">{{ mostActiveFaction }}</div>
            </div>
            <div class="space-y-2">
              <h4 class="font-bold">Data Detective Tips</h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <span class="text-lg mr-2">🔍</span>
                  <span class="text-sm"
                    >Track faction movements for pattern analysis</span
                  >
                </li>
                <li class="flex items-start">
                  <span class="text-lg mr-2">📊</span>
                  <span class="text-sm"
                    >Compare health metrics across regions</span
                  >
                </li>
                <li class="flex items-start">
                  <span class="text-lg mr-2">🌟</span>
                  <span class="text-sm"
                    >Monitor social interactions between creatures</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Weather Report -->
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="font-serif text-xl font-bold mb-4">Data Conditions</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Signal Strength:</span>
              <span class="font-bold">Excellent</span>
            </div>
            <div class="flex justify-between">
              <span>Data Quality:</span>
              <span class="font-bold">98%</span>
            </div>
            <div class="flex justify-between">
              <span>Network Status:</span>
              <span class="font-bold text-green-600">Online</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useWorldLinks } from "../composables/useWorldLinks";
import CreatureHealthStripPlot from "../components/dashboard/CreatureHealthStripPlot.vue";
import CurrentLocationsMap from "../components/dashboard/CurrentLocationsMap.vue";
import { useDashboardData } from "../composables/useDashboardData";
import DataStoryCard from "../components/dashboard/DataStoryCard.vue";

const route = useRoute();
const store = useStore();
const { getWorldLink } = useWorldLinks();
const loading = ref(false);

const { currentCreatureStats } = useDashboardData();

// Get worldId from route params
const worldId = computed(() => {
  console.log("route.params.worldId: ", route.params.worldId);
  return route.params.worldId as string;
});

// Load world data when component mounts or worldId changes
onMounted(async () => {
  if (worldId.value) {
    await store.dispatch("world/fetchCurrentCreatureStats", worldId.value);
    await store.dispatch("world/fetchCurrentLocations", worldId.value);
  }
});

const joinWorld = async () => {
  if (!worldId.value) return;

  loading.value = true;
  try {
    const link = await getWorldLink({ worldId: worldId.value });
    if (link && link.gameLink) {
      window.location.href = link.gameLink;
    } else {
      console.error("Invalid link returned");
    }
  } catch (error) {
    console.error("Failed to get world link:", error);
  } finally {
    loading.value = false;
  }
};

// Use store getters for stats
const totalCreatures = computed(
  () => store.getters["world/currentCreatureStats"]?.length || 0
);
const activeFactions = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  return stats ? new Set(stats.map((c) => c.faction)).size : 0;
});

const worldHealth = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  if (!stats || !stats.length) return 0;

  const avgHealth =
    stats.reduce((sum, creature) => sum + (creature.health ?? 0), 0) /
    stats.length;
  return Math.round(avgHealth * 100);
});

const mostActiveFaction = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  if (!stats || !stats.length) return "None";

  const factionCounts = stats.reduce(
    (acc, creature) => {
      acc[creature.faction] = (acc[creature.faction] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(factionCounts).sort(([, a], [, b]) => b - a)[0][0];
});

const highestHealth = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  if (!stats || !stats.length) return 0;

  return Math.round(100 * Math.max(...stats.map((c) => c.health ?? 0)));
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const startExploring = () => {
  // Implementation for exploration start
};
</script>
