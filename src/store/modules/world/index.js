import { watchEffect } from "vue";
import currentStateQueries from "@/graphql/queries/currentStateQueries";
import { useDefinedQuery } from "@/composables/queries/useDefinedQuery";
import progressQueries from "../../../graphql/queries/progressionsQueries";
import router from "../../../router/index";

const state = {
  currentWorld: null,
  currentCreatureStats: null,
  currentFactionStats: null,
  currentCreatureLocations: null,
  currentPlayerLocations: null,
  playerProgressionData: null,
};

const mutations = {
  SET_CURRENT_WORLD(state, world) {
    state.currentWorld = world;
  },
  SET_CURRENT_STATE_DATA(state, stateData) {
    state.currentStateData = stateData;
  },
  SET_CURRENT_CREATURE_STATS(state, currentStats) {
    state.currentCreatureStats = currentStats;
  },
  SET_CURRENT_FACTION_STATS(state, factionStats) {
    state.currentFactionStats = factionStats;
  },
  SET_CURRENT_CREATURE_LOCATIONS(state, locations) {
    console.log("setting current creature locations: ", locations);
    state.currentCreatureLocations = locations;
  },
  SET_CURRENT_PLAYER_LOCATIONS(state, locations) {
    state.currentPlayerLocations = locations;
  },
  SET_PLAYER_PROGRESSION_DATA(state, data) {
    state.playerProgressionData = data;
  },
  SET_LOADING(state, { type, value }) {
    state.loading = { ...state.loading, [type]: value };
  },
  SET_ERROR(state, { type, error }) {
    state.error = { ...state.error, [type]: error };
  },
  RESET_WORLD_DATA(state) {
    state.currentWorld = null;
    state.currentCreatureStats = null;
    state.currentFactionStats = null;
    state.currentCreatureLocations = null;
    state.currentPlayerLocations = null;
    state.playerProgressionData = null;
  },
};

const handleError = (commit, type, error) => {
  commit("SET_ERROR", { type, error });
  console.error(`[Error in ${type}]`, error);
};

const actions = {
  async selectWorld({ commit, dispatch }, worldData) {
    commit("SET_CURRENT_WORLD", worldData);
    router.push("/world");
    dispatch("fetchCurrentCreatureStats", worldData.world_id);
    dispatch("fetchCurrentLocations", worldData.world_id);
    dispatch("fetchPlayerProgression", {
      worldId: worldData.world_id,
      playerId: worldData.player_id,
    });
  },

  async fetchWorldData({ dispatch, getters }, worldId) {
    dispatch("fetchUserPlayers", userId);
    dispatch("fetchCurrentUser", userId);

    // Now we check if the user is a researcher
    if (getters.isResearcher) {
      dispatch("admin/fetchAllUsers", null, { root: true });
      dispatch("admin/fetchAllWorlds", null, { root: true });
    }
  },

  async fetchCurrentCreatureStats({ commit }, worldId) {
    commit("SET_ERROR", { type: "currentCreatureStats", error: null });

    try {
      const { loading, result, error, run } = useDefinedQuery(
        currentStateQueries.CURRENT_CREATURES_STATS,
        { worldId: "world_CCProd_" + worldId }
      );

      watchEffect(() => {
        commit("SET_LOADING", {
          type: "currentCreatureStats",
          value: loading.value,
        });
      });

      watchEffect(() => {
        if (error.value) {
          console.log("error: ", error.value);
          handleError(commit, "currentCreatureStats", error.value);
        }
        if (result.value) {
          commit(
            "SET_CURRENT_CREATURE_STATS",
            result.value.creaturesCurrentStats.creatures
          );
          commit(
            "SET_CURRENT_FACTION_STATS",
            result.value.creaturesCurrentStats.factions
          );
        }
      });

      await run();
    } catch (err) {
      console.log("error: ", err);
      handleError(commit, "currentCreatureStats", err.value);
    }
  },

  async fetchCurrentLocations({ commit }, worldId) {
    console.log("fetching current locations for world: ", worldId);
    commit("SET_ERROR", { type: "currentLocations", error: null });

    try {
      const { loading, result, error, run } = useDefinedQuery(
        currentStateQueries.CURRENT_LOCATIONS,
        { worldId: "world_CCProd_" + worldId }
      );

      watchEffect(() => {
        commit("SET_LOADING", {
          type: "currentLocations",
          value: loading.value,
        });
      });

      watchEffect(() => {
        if (error.value) {
          console.log("error: ", error.value);
          handleError(commit, "currentLocations", error.value);
        }
        if (result.value) {
          commit(
            "SET_CURRENT_CREATURE_LOCATIONS",
            result.value.currentCreatureLocations
          );
          commit(
            "SET_CURRENT_PLAYER_LOCATIONS",
            result.value.currentPlayerLocations
          );
        }
      });

      await run();
    } catch (err) {
      console.log("error: ", err);
      handleError(commit, "currentLocations", err.value);
    }
  },

  async fetchPlayerProgression({ commit }, { worldId, playerId }) {
    commit("SET_ERROR", { type: "playerProgression", error: null });
    try {
      const { loading, result, error, run } = useDefinedQuery(
        progressQueries.GET_FORAGING_PROGRESS,
        { worldId: "world_CCProd_" + worldId, playerId: "player_" + playerId }
      );
      watchEffect(() => {
        commit("SET_LOADING", {
          type: "playerProgression",
          value: loading.value,
        });
      });
      watchEffect(() => {
        if (error.value) {
          console.log("error: ", error.value);
          handleError(commit, "playerProgression", error.value);
        }
        if (result.value) {
          commit(
            "SET_PLAYER_PROGRESSION_DATA",
            result.value.playerForagingProgression
          );
        }
      });
      await run();
    } catch (err) {
      console.log("error: ", err);
      handleError(commit, "playerProgression", err.value);
    }
  },

  async gotoWorld({ commit }, data) {
    router.push("/world");

    // try {
    //   const link = await getWorldLink(data);
    //   if (link && link.gameLink) {
    //     console.log("directing to: ", link.gameLink);
    //     window.location.href = link.gameLink;
    //   } else {
    //     console.error("Invalid link returned");
    //   }
    // } catch (error) {
    //   console.error("Failed to navigate:", error.message);
    // }
  },
};

const getters = {
  currentWorldId: (state) => state.currentWorld?.world_id || null,
  currentPlayerId: (state) => state.currentPlayer?.player_id || null,
  currentWorldName: (state) => state.currentWorld?.world_name || null,
  currentPlayerName: (state) => state.currentWorld?.player_name || null,
  currentCreatureStats: (state) => state.currentCreatureStats || null,
  currentFactionStats: (state) => state.currentFactionStats || null,
  currentCreatureLocations: (state) => state.currentCreatureLocations || null,
  currentPlayerLocations: (state) => state.currentPlayerLocations || null,
  playerProgressionData: (state) => state.playerProgressionData || null,
  loading: (state) => state.loading,
  error: (state) => state.error,
  getWorldStats: (state) => (worldId) => {
    // Return stats for specific world
    const stats = state.currentStateData?.find((w) => w.worldId === worldId);
    if (!stats) return null;

    return {
      playerCount: stats.playerCount,
      creatureCount: stats.creatureCount,
      avgHealth: stats.avgHealth,
      activePlayers: stats.activePlayers,
      recentEvents: stats.recentEvents,
    };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
