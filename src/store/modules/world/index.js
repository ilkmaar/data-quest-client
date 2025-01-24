import currentStateQueries from "@/graphql/queries/currentStateQueries";
import { useDefinedQuery } from "@/composables/queries/useDefinedQuery";
import progressQueries from "../../../graphql/queries/progressionsQueries";
import router from "../../../router/index";
import { watchEffect, watch } from "vue";

const state = {
  currentWorldId: null,
  currentWorldData: null,
  currentCreatureStats: null,
  currentFactionStats: null,
  currentCreatureLocations: null,
  currentPlayerLocations: null,
  playerProgressionData: null,
  loading: {
    currentCreatureStats: false,
    currentLocations: false,
    playerProgression: false,
    initialization: false,
  },
  error: {
    currentCreatureStats: null,
    currentLocations: null,
    playerProgression: null,
    initialization: null,
  },
};

const mutations = {
  SET_CURRENT_WORLD_ID(state, worldId) {
    state.currentWorldId = worldId;
  },
  SET_CURRENT_WORLD_DATA(state, worldData) {
    state.currentWorldData = worldData;
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
  async setCurrentWorldId({ commit, dispatch }, { worldId }) {
    const currentWorldId = state.currentWorldId;

    console.log("[world store] setting current world: ", worldId);
    if (!currentWorldId || currentWorldId !== worldId) {
      commit("RESET_WORLD_DATA");
      commit("SET_CURRENT_WORLD_ID", worldId);
      dispatch("initializeWorld");
    }
  },

  async initializeWorld({ dispatch, state, commit, rootGetters }) {
    const worldId = state.currentWorldId;
    console.log("initializing world: ", worldId);

    try {
      // Fetch all required data
      await Promise.all(
        [
          dispatch("fetchCurrentCreatureStats", worldId),
          dispatch("fetchCurrentLocations", worldId),
        ].filter(Boolean)
      ); // Filter out undefined promises
    } catch (error) {
      console.error("Failed to initialize world:", error);
      commit("SET_ERROR", { type: "initialization", error });
    }
  },

  async fetchCurrentCreatureStats({ commit }, worldId) {
    commit("SET_ERROR", { type: "currentCreatureStats", error: null });

    try {
      const { loading, result, error, run } = useDefinedQuery(
        currentStateQueries.CURRENT_CREATURES_STATS,
        { worldId: "world_CCProd_" + worldId }
      );

      // Set up watchers before running the query
      const stopLoadingWatch = watch(loading, (newValue) => {
        commit("SET_LOADING", {
          type: "currentCreatureStats",
          value: newValue,
        });
      });

      const stopResultWatch = watch(
        [result, error],
        ([newResult, newError]) => {
          if (newError) {
            handleError(commit, "currentCreatureStats", newError);
            // Clean up watchers on error
            stopLoadingWatch();
            stopResultWatch();
          }

          if (newResult) {
            commit(
              "SET_CURRENT_CREATURE_STATS",
              newResult.creaturesCurrentStats.creatures
            );
            commit(
              "SET_CURRENT_FACTION_STATS",
              newResult.creaturesCurrentStats.factions
            );
            // Clean up watchers after successful result
            stopLoadingWatch();
            stopResultWatch();
          }
        }
      );

      await run();
    } catch (err) {
      handleError(commit, "currentCreatureStats", err);
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

      const stopLoadingWatch = watch(loading, (newValue) => {
        commit("SET_LOADING", {
          type: "currentLocations",
          value: newValue,
        });
      });

      const stopResultWatch = watch(
        [result, error],
        ([newResult, newError]) => {
          if (newError) {
            handleError(commit, "currentLocations", newError);
            stopLoadingWatch();
            stopResultWatch();
          }

          if (newResult) {
            commit(
              "SET_CURRENT_CREATURE_LOCATIONS",
              newResult.currentCreatureLocations
            );
            commit(
              "SET_CURRENT_PLAYER_LOCATIONS",
              newResult.currentPlayerLocations
            );
            stopLoadingWatch();
            stopResultWatch();
          }
        }
      );

      await run();
    } catch (err) {
      handleError(commit, "currentLocations", err);
    }
  },

  async fetchPlayerProgression({ commit }, { worldId, playerId }) {
    commit("SET_ERROR", { type: "playerProgression", error: null });

    try {
      const { loading, result, error, run } = useDefinedQuery(
        progressQueries.GET_FORAGING_PROGRESS,
        {
          worldId: "world_CCProd_" + worldId,
          playerId: "player_" + playerId,
        }
      );

      const stopLoadingWatch = watch(loading, (newValue) => {
        commit("SET_LOADING", {
          type: "playerProgression",
          value: newValue,
        });
      });

      const stopResultWatch = watch(
        [result, error],
        ([newResult, newError]) => {
          if (newError) {
            handleError(commit, "playerProgression", newError);
            stopLoadingWatch();
            stopResultWatch();
          }

          if (newResult) {
            commit(
              "SET_PLAYER_PROGRESSION_DATA",
              newResult.playerForagingProgression
            );
            stopLoadingWatch();
            stopResultWatch();
          }
        }
      );

      await run();
    } catch (err) {
      handleError(commit, "playerProgression", err);
    }
  },

  async goToWorld({ commit }, { worldId }) {
    console.log("[world store] going to world: ", worldId);
    router.push(`/world/${worldId}`);
  },
};

const getters = {
  currentWorldId: (state) => state.currentWorldId || null,
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
