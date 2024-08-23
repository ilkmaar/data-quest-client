import { ref, computed, watchEffect } from 'vue'
import { useDefinedQuery } from './queries/useDefinedQuery.js'
import availableQueries from '../graphql/queries/index.js'

export default function useDataBrowser(user, worlds) {
    const queryTypes = [...new Set(availableQueries.map((q) => q.type))]
    const activeTab = ref(queryTypes[0])
    const filteredQueries = computed(() => availableQueries.filter((query) => query.type === activeTab.value))

    const selectedQuery = ref({})
    const selectedQueryVariables = ref({})

    const selectedQueryResult = ref(null)
    const selectedQueryLoading = ref(false)
    const selectedQueryError = ref(null)

    const selectQuery = (query) => {
        selectedQuery.value = query
        selectedQueryVariables.value = {}

        selectedQueryResult.value = null
        selectedQueryLoading.value = false
        selectedQueryError.value = null

        // Set default values for variables if they exist
        const variables = {}
        query.variables?.forEach((variable) => {
            if (variable.required && variable.default !== undefined) {
                selectedQueryVariables.value[variable.name] = ref(variable.default)
            }

            if (variable.name == 'playerId') {
                selectedQueryVariables.value[variable.name] = ref(user.value.player_id)
            }

            if (variable.name == 'worldId') {
                selectedQueryVariables.value[variable.name] = ref(worlds.value[0].world_id)
            }
        })

        Object.assign(selectedQueryVariables.value, variables)
    }

    const getVariableDefinitions = () => {
        selectedQuery.value.variables
    }

    const runSelectedQuery = () => {
        const { result, loading, error, run } = useDefinedQuery(selectedQuery.value, selectedQueryVariables.value)

        watchEffect(() => {
            console.log('Query result: ', result.value)
            selectedQueryResult.value = result.value
            selectedQueryLoading.value = loading.value
            selectedQueryError.value = error.value
        })

        run()
    }

    selectedQuery.value = filteredQueries.value[0]

    return {
        queryTypes,
        activeTab,
        filteredQueries,
        selectedQuery,
        selectedQueryVariables,
        selectQuery,
        getVariableDefinitions,
        runSelectedQuery,
        result: selectedQueryResult,
        loading: selectedQueryLoading,
        error: selectedQueryError,
    }
}
