import { watchEffect } from "vue"
import userQueries from '@/graphql/queries/userQueries'
import { useDefinedQuery } from '@/composables/queries/useDefinedQuery'

const state = {
    userData: null,
    playerWorlds: null,
    loading: {
        userData: null,
        playerWorlds: null,
    },
    error: {
        userData: null,
        playerWorlds: null,
    },
}

const mutations = {
    SET_USER_DATA(state, userData) {
        state.userData = userData
    },
    SET_USER_PLAYER_WORLDS(state, playerWorlds) {
        state.playerWorlds = playerWorlds
    },
    SET_LOADING(state, { type, value }) {
        state.loading = { ...state.loading, [type]: value };
    },
    SET_ERROR(state, { type, error }) {
        state.error = { ...state.error, [type]: error };
    },
    RESET_USER_DATA(state) {
        state.userData = null
        state.playerWorlds = null
    },
}

const handleError = (commit, type, error) => {
    commit('SET_ERROR', { type, error })
    console.error(`[Error in ${type}]`, error)
}

const actions = {
    async fetchUserData({ dispatch, getters }, userId) {
        dispatch('fetchUserPlayers', userId)
        await dispatch('fetchCurrentUser', userId)

        // Now we check if the user is a researcher
        if (getters.isResearcher) {
            dispatch('admin/fetchAllUsers', null, { root: true })
            dispatch('admin/fetchAllWorlds', null, { root: true })
        }
    },

    async fetchUserPlayers({ commit }, userId) {
        commit('SET_ERROR', { type: 'playerWorlds', error: null })

        try {
            const { loading, result, error, run } = useDefinedQuery(userQueries.GET_USER_PLAYERS, { userId })

            watchEffect(() => {
                commit('SET_LOADING', { type: 'playerWorlds', value: loading.value })
            })

            watchEffect(() => {
                if (error.value) {
                    handleError(commit, 'playerWorlds', error.value)
                }
                if (result.value) {
                    commit('SET_USER_PLAYER_WORLDS', result.value.userPlayers)
                }
            })

            await run()
        } catch (err) {
            handleError(commit, 'playerWorlds', err.value)
        }
    },

    async fetchCurrentUser({ commit }, userId) {
        commit('SET_ERROR', { type: 'userData', error: null })

        try {
            const { loading, result, error, run } = useDefinedQuery(userQueries.GET_CURRENT_USER, { userId })

            // Store the reactive loading variable
            commit('SET_LOADING', { type: 'userData', value: loading })

            watchEffect(() => {
                if (error.value) {
                    handleError(commit, 'userData', error.value)
                } else if (result.value) {
                    commit('SET_USER_DATA', result.value.currentUser)
                }
            })

            await run()
        } catch (err) {
            handleError(commit, 'userData', err)
        }
    },
}

const getters = {
    userData: (state) => state.userData,
    isResearcher: (state) => state.userData?.roles.some((role) => role.name === 'researcher') || false,
    playerWorlds: (state) => state.playerWorlds || [],
    loading: (state) => state.loading,
    error: (state) => state.error,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}