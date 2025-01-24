<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Updated header styling with more vertical space -->
      <header
        class="rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 text-center bg-white"
      >
        <div class="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
          {{ currentDate }}
        </div>
        <h1
          class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight"
        >
          The Ilkmaar Explorer
        </h1>
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <span class="text-xs sm:text-sm text-gray-600 font-serif"
            >Vol. XXIII</span
          >
          <span
            class="text-xs sm:text-sm bg-indigo-600 text-white px-3 py-1 rounded-full font-medium"
          >
            Data Science Edition
          </span>
          <span class="text-xs sm:text-sm text-gray-600">Price: 2 Coins</span>
        </div>
      </header>

      <!-- Updated banner styling with more vertical space -->
      <div
        class="bg-gradient-to-r from-red-600 to-red-700 shadow-lg mb-4 sm:mb-6 lg:mb-8 rounded-xl overflow-hidden"
      >
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="flex items-center mb-3 sm:mb-4">
            <span
              class="bg-white/20 text-white text-xs sm:text-sm px-3 py-1 rounded-full backdrop-blur-sm font-medium"
            >
              🚨 URGENT ALERT
            </span>
          </div>
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
          >
            <div class="space-y-2 sm:space-y-3">
              <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                World Health Crisis
              </h2>
              <p class="text-sm sm:text-base text-white/90">
                World health has dropped to
                <span class="font-bold">{{ worldHealth }}%</span>. Your data
                science expertise is needed immediately!
              </p>
            </div>
            <button
              @click="joinWorld"
              :disabled="loading"
              class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-md text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <span>{{ loading ? "Loading..." : "Play Now" }}</span>
              <span v-if="!loading" class="text-xl">🎮</span>
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Main Column -->
        <div class="lg:col-span-8 space-y-4">
          <!-- Lead Story as a social post -->
          <article class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4">
              <div class="flex items-center space-x-3 mb-4">
                <div
                  class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                >
                  <span class="text-xl">🔬</span>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">Data Science Team</h3>
                  <span class="text-sm text-gray-500">Just now</span>
                </div>
              </div>
              <p class="text-gray-800 mb-4">
                🚨 ALERT: Our latest analysis reveals concerning patterns in
                creature health across all factions. Check out these critical
                findings 👇
              </p>
              <div
                class="data-visualization bg-white relative h-[420px] rounded-lg border border-gray-200"
              >
                <CreatureHealthStripPlot />
              </div>

              <!-- Add insights and engagement section -->
              <div class="border-t border-gray-100 pt-3 mt-4">
                <!-- Insight Pills -->
                <div class="mb-4 flex flex-wrap gap-2">
                  <div
                    v-for="(insight, index) in healthInsights"
                    :key="index"
                    class="group relative inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <AlertCircleIcon class="h-4 w-4 text-gray-500" />
                    <span class="text-sm text-gray-600">{{ insight }}</span>

                    <!-- Floating Tooltip -->
                    <div
                      class="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
                    >
                      Explore this pattern in the data explorer
                    </div>
                  </div>
                </div>

                <!-- Quick Stats styled as engagement metrics -->
                <div class="border-t border-gray-100 pt-3 mt-2">
                  <div class="grid grid-cols-3 gap-3 justify-items-center">
                    <div class="flex items-center justify-center space-x-2">
                      <span class="text-xl">👾</span>
                      <div class="text-center">
                        <div class="font-bold text-gray-900">
                          {{ totalCreatures }}
                        </div>
                        <div class="text-xs text-gray-600">Creatures</div>
                      </div>
                    </div>
                    <div class="flex items-center justify-center space-x-2">
                      <span class="text-xl">⚔️</span>
                      <div class="text-center">
                        <div class="font-bold text-gray-900">
                          {{ activeFactions }}
                        </div>
                        <div class="text-xs text-gray-600">Factions</div>
                      </div>
                    </div>
                    <div class="flex items-center justify-center space-x-2">
                      <span class="text-xl">❤️</span>
                      <div class="text-center">
                        <div class="font-bold text-gray-900">
                          {{ highestHealth }}%
                        </div>
                        <div class="text-xs text-gray-600">Peak Health</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Moved and restyled action buttons -->
                <div class="border-t border-gray-100 pt-4 mt-4">
                  <PostActions exploreText="Explore data" />
                </div>
              </div>
            </div>
          </article>

          <!-- Secondary Story as a social post -->
          <article class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-4">
              <div class="flex items-center space-x-3 mb-4">
                <div
                  class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                >
                  <span class="text-xl">🗺️</span>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900">
                    Movement Analysis Team
                  </h3>
                  <span class="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>
              <p class="text-gray-800 mb-3">
                🌍 Breaking: We're tracking unusual creature gatherings across
                multiple locations. Here's our live heatmap showing the current
                hotspots of activity ��
              </p>
              <div
                class="data-visualization bg-white relative h-[400px] rounded-lg border border-gray-200"
              >
                <CurrentLocationsMap />
              </div>

              <!-- Add insights and engagement section for map -->
              <div class="border-t border-gray-100 pt-3 mt-4">
                <div class="mb-4 flex flex-wrap gap-2">
                  <div
                    v-for="(insight, index) in locationInsights"
                    :key="index"
                    class="group relative inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <AlertCircleIcon class="h-4 w-4 text-gray-500" />
                    <span class="text-sm text-gray-600">{{ insight }}</span>

                    <div
                      class="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
                    >
                      Explore this pattern in the data explorer
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-100 pt-4 mt-4">
                  <PostActions exploreText="Explore data" />
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Sidebar styled more like social widgets -->
        <aside class="lg:col-span-4 space-y-4">
          <!-- Faction Watch -->
          <div class="bg-white p-4 rounded-xl shadow-lg">
            <h3 class="font-serif text-xl font-bold mb-3 text-gray-900">
              Faction Watch
            </h3>
            <div class="space-y-3">
              <div class="border-b border-gray-200 pb-2">
                <div class="font-medium text-gray-600 mb-1">
                  Most Active Faction
                </div>
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
                    <span class="text-sm"
                      >Compare health metrics across regions</span
                    >
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
          <div
            class="bg-white p-4 rounded-xl shadow-lg border-t-4 border-blue-500"
          >
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useWorldLinks } from "../composables/useWorldLinks";
import CreatureHealthStripPlot from "../components/dashboard/CreatureHealthStripPlot.vue";
import CurrentLocationsMap from "../components/dashboard/CurrentLocationsMap.vue";
import PostActions from "../components/dashboard/PostActions.vue";
import {
  AlertCircleIcon,
  MessageCircleIcon,
  Share2Icon,
  SparklesIcon,
  ExternalLinkIcon,
} from "lucide-vue-next";

const store = useStore();
const { getWorldLink } = useWorldLinks();
const loading = ref(false);

// Get worldId from both route params and store
const worldId = computed(() => store.getters["world/currentWorldId"]);

// Simplify join world function
const joinWorld = async () => {
  if (!worldId.value) return;

  loading.value = true;
  try {
    const link = await getWorldLink({ worldId: worldId.value });
    if (link?.gameLink) {
      window.location.href = link.gameLink;
    }
  } catch (error) {
    console.error("Failed to get world link:", error);
  } finally {
    loading.value = false;
  }
};

// Simplify computed properties to use optional chaining and null coalescing
const totalCreatures = computed(
  () => store.getters["world/currentCreatureStats"]?.length ?? 0
);

const activeFactions = computed(
  () =>
    new Set(
      store.getters["world/currentCreatureStats"]?.map((c) => c.faction) ?? []
    ).size
);

const worldHealth = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  if (!stats?.length) return 0;

  const avgHealth =
    stats.reduce((sum, creature) => sum + (creature.health ?? 0), 0) /
    stats.length;
  return Math.round(avgHealth * 100);
});

const mostActiveFaction = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  if (!stats?.length) return "None";

  const factionCounts = stats.reduce(
    (acc, creature) => {
      acc[creature.faction] = (acc[creature.faction] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(factionCounts).sort(([, a], [, b]) => b - a)[0][0];
});

const highestHealth = computed(() => {
  const stats = store.getters["world/currentCreatureStats"];
  if (!stats?.length) return 0;
  return Math.round(100 * Math.max(...stats.map((c) => c.health ?? 0)));
});

const currentDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);

// Add insights data
const healthInsights = ref([
  "Unusual health decline in Northern region",
  "3 factions showing recovery trends",
  "Critical health alerts in coastal areas",
]);

const locationInsights = ref([
  "High activity cluster in Central Forest",
  "Unusual migration patterns detected",
  "New gathering point identified",
]);
</script>

<style scoped>
/* Add custom styles for the newspaper title */
.font-serif {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
}
</style>
