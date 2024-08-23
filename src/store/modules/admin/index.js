import { watch } from 'vue'
import { useDefinedQuery } from '@/composables/queries/useDefinedQuery.js'
import { useDefinedMutation } from '@/composables/queries/useDefinedMutation.js'
import adminQueries from '@/graphql/queries/adminQueries.js'
import adminMutations from '@/graphql/mutations/adminMutations.js'

const { GET_USERS, GET_WORLDS } = adminQueries
const { ASSIGN_PLAYER_TO_USER, ADD_USER_TO_WORLD, REMOVE_USER_FROM_WORLD } = adminMutations

const initialState = {
    users: [],
    worlds: [],
    loading: false,
    error: null,
    refetchFunctions: {},
}

const mutations = {
    SET_USERS: (state, users) => {
        console.log("users: ", users)
        state.users = users
    },
    SET_WORLDS: (state, worlds) => {
        console.log("worlds: ", worlds)
        state.worlds = worlds
    },
    SET_AVAILABLE_WORLDS: (state, worlds) => {
        state.availableWorlds = worlds
    },
    SET_LOADING: (state, loading) => {
        state.loading = loading
    },
    SET_ERROR: (state, error) => {
        state.error = error
    },
    SET_REFETCH_FUNCTION: (state, { query, refetch }) => {
        state.refetchFunctions[query] = refetch
    },
}

const actions = {
    async fetchData({ commit }, { query, mutationName, commitType, options = {} }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        try {
            const { result, error, run, refetch } = useDefinedQuery(query, options.variables || {}, options)
            watch(
                () => result.value,
                (newVal) => {
                    if (error.value) {
                        commit('SET_ERROR', error.value)
                    } else if (newVal) {
                        commit(commitType, newVal[mutationName])
                    }
                },
            )
            await run()
            commit('SET_REFETCH_FUNCTION', { query: query.name, refetch })
        } catch (err) {
            commit('SET_ERROR', err)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async refetchData({ state, commit }, query) {
        const queryName = query.name
        if (state.refetchFunctions[queryName]) {
            commit('SET_LOADING', true)
            try {
                const result = await state.refetchFunctions[queryName]()
                if (result.data) {
                    const mutationName = queryName.replace('GET_', '').toLowerCase()
                    commit(`SET_${mutationName.toUpperCase()}`, result.data[mutationName])
                }
            } catch (err) {
                commit('SET_ERROR', err)
            } finally {
                commit('SET_LOADING', false)
            }
        }
    },

    fetchAllUsers({ dispatch }) {
        return dispatch('fetchData', { query: GET_USERS, mutationName: 'users', commitType: 'SET_USERS' })
    },

    fetchAllWorlds({ dispatch }) {
        return dispatch('fetchData', { query: GET_WORLDS, mutationName: 'worlds', commitType: 'SET_WORLDS' })
    },

    async modifyUserWorld({ commit, dispatch }, { mutation, userId, playerId }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        try {
            const { result, error, run } = useDefinedMutation(mutation)

            watch(result, async (newVal) => {
                if (error.value) {
                    console.error(`${mutation} error:`, error.value)
                    commit('SET_ERROR', error.value)
                } else if (newVal) {
                    await dispatch('refetchData', GET_WORLDS)
                }
            })

            await run({ userId, playerId })
        } catch (err) {
            commit('SET_ERROR', err)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async modifyUserPlayers({ commit, dispatch }, { mutation, userId, playerId }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        try {
            const { result, error, run } = useDefinedMutation(mutation)

            watch(result, async (newVal) => {
                if (error.value) {
                    console.error(`${mutation} error:`, error.value)
                    commit('SET_ERROR', error.value)
                } else if (newVal) {
                    await dispatch('refetchData', GET_WORLDS)
                    await dispatch('refetchData', GET_USERS)
                }
            })

            await run({ userId, playerId })
        } catch (err) {
            commit('SET_ERROR', err)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    assignPlayerToUser({ dispatch }, payload) {
        return dispatch('modifyUserPlayers', { ...payload, mutation: ASSIGN_PLAYER_TO_USER })
    },

    addUserToWorld({ dispatch }, payload) {
        return dispatch('modifyUserWorld', { ...payload, mutation: ADD_USER_TO_WORLD })
    },

    removeUserFromWorld({ dispatch }, payload) {
        return dispatch('modifyUserWorld', { ...payload, mutation: REMOVE_USER_FROM_WORLD })
    },
}

const getters = {
    users: (state) => state.users,
    worlds: (state) => state.worlds,
    loading: (state) => state.loading,
    error: (state) => state.error,
}

export default {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters,
}