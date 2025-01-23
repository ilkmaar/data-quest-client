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
import { useRouter } from "vue-router";
import UserWorldsList from "../components/user/UserWorldsList.vue";
import NoWorlds from "../components/user/NoWorlds.vue";
import LoadingSpinner from "../components/common/LoadingSpinner.vue";

const store = useStore();
const router = useRouter();

const loading = computed(() => store.getters["user/loading"].playerWorlds);
const games = computed(() => store.getters["user/playerWorlds"] || []);

const selectWorld = async (data) => {
  try {
    // Use the store action to handle world selection
    await store.dispatch("world/selectWorld", data);
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
