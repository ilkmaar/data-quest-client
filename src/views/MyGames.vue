<template>
  <div class="my-worlds-container">
    <LoadingSpinner v-if="loading" />
    <UserWorldsList v-else :playerWorlds="games" @world-click="selectWorld" />
    <NoWorlds v-if="!loading && !games.length" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserWorldsList from "../components/user/UserWorldsList.vue";
import NoWorlds from "../components/user/NoWorlds.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";

const store = useStore();
const loading = computed(() => store.getters["user/loading"].playerWorlds);
const games = computed(() => store.getters["user/playerWorlds"] || []);

const selectWorld = async (data) => {
  try {
    await store.dispatch("world/goToWorld", {
      worldId: data.world_id,
      playerId: data.player_id,
      playerName: data.player_name,
      worldName: data.world_name,
    });
  } catch (error) {
    console.error("Failed to select world:", error.message);
  }
};
</script>

<style scoped>
.my-worlds-container {
  width: 100%;
  padding: 20px;
  /* Ensure the container uses block layout */
  display: block;
}
</style>
