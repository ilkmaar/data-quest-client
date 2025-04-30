<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <DashboardHeader />

      <HealthAlertBanner
        :world-health="worldHealth"
        :loading="loading"
        @join="joinWorld"
      />

      <!-- Add Survey Notification here -->
      <div v-if="showSurvey" class="mb-4">
        <SurveyNotification @dismiss="dismissSurvey" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Main Column -->
        <div class="lg:col-span-8 space-y-4">
          <SocialPost
            icon="🎥"
            title="Field Research Team"
            timestamp="5 minutes ago"
            :insights="videoInsights"
            explore-text="Watch full video"
            video-url="https://www.youtube.com/embed/dQw4w9WgXcQ"
          >
            <template #description>
              📹 EXCLUSIVE: Captured rare footage of inter-faction interaction
              in the wild. This behavior could explain recent health
              fluctuations.
            </template>
          </SocialPost>

          <SocialPost
            icon="🔬"
            title="Data Science Team"
            timestamp="Just now"
            :insights="healthInsights"
            explore-text="Explore data"
          >
            <template #description>
              🚨 ALERT: Our latest analysis reveals concerning patterns in
              creature health across all factions. Check out these critical
              findings 👇
            </template>
            <template #visualization>
              <CreatureHealthStripPlot />
            </template>
            <template #stats>
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
            </template>
          </SocialPost>

          <SocialPost
            icon="🗺️"
            title="Movement Analysis Team"
            timestamp="2 hours ago"
            :insights="locationInsights"
            explore-text="Explore data"
          >
            <template #description>
              🌍 Breaking: We're tracking unusual creature gatherings across
              multiple locations. Here's our live heatmap showing the current
              hotspots of activity
            </template>
            <template #visualization>
              <CurrentLocationsMap />
            </template>
          </SocialPost>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-4">
          <DashboardSidebar :most-active-faction="mostActiveFaction" />
          <Poll
            :question="pollData.question"
            :options="pollData.options"
            :icon="pollData.icon"
            :posted-by="pollData.postedBy"
            :timestamp="pollData.timestamp"
            duration="24h"
          />
          <ForagingProgress />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useWorldLinks } from "../composables/useWorldLinks";
import DashboardHeader from "../components/dashboard/DashboardHeader.vue";
import HealthAlertBanner from "../components/dashboard/HealthAlertBanner.vue";
import SocialPost from "../components/dashboard/SocialPost.vue";
import DashboardSidebar from "../components/dashboard/DashboardSidebar.vue";
import CreatureHealthStripPlot from "../components/dashboard/CreatureHealthStripPlot.vue";
import CurrentLocationsMap from "../components/dashboard/CurrentLocationsMap.vue";
import ForagingProgress from "../components/dashboard/ForagingProgress.vue";
import SurveyNotification from "../components/dashboard/SurveyNotification.vue";
import Poll from "../components/dashboard/Poll.vue";

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
    const worldData = store.getters["world/currentWorldData"];
    console.log("worldData: ", worldData);
    const link = await getWorldLink(worldData);
    console.log("link: ", link);
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

  return Object.entries(factionCounts).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0][0];
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

// Add video insights
const videoInsights = ref([
  "First recorded peaceful interaction",
  "Evidence of resource sharing",
  "New behavioral patterns observed",
]);

// Add survey state
const showSurvey = ref(true);

const dismissSurvey = () => {
  showSurvey.value = false;
  // Optionally save dismissal to localStorage to prevent showing again
  localStorage.setItem("surveyDismissed", new Date().toISOString());
};

// Add this near your other refs
const pollData = ref({
  question: "What's causing the unusual health decline?",
  options: [
    { text: "Environmental factors", votes: 45 },
    { text: "New predator species", votes: 32 },
    { text: "Food shortage", votes: 28 },
    { text: "Disease outbreak", votes: 15 },
    { text: "Other", votes: 8 },
  ],
  icon: "📊",
  postedBy: "Research Team",
  timestamp: "10 minutes ago",
});
</script>

<style scoped>
/* Add custom styles for the newspaper title */
.font-serif {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
}
</style>
