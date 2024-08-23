import { ref, watchEffect } from 'vue'
import { useQuery, provideApolloClients } from '@vue/apollo-composable'
import { unauthenticatedClient, authenticatedClient } from '../../graphql/apollo.js'

export function useDefinedQuery(query, variables = {}, options = {}) {
    const queryResult = ref(null)
    const queryLoading = ref(false)
    const queryError = ref(null)
    const refetchQuery = ref(null)

    const graphQLQuery = query.query

    const runQuery = () => {
        const clientId = query.client === 'unauthenticated' ? 'unauthenticated' : 'authenticated'
        const client = clientId === 'unauthenticated' ? unauthenticatedClient : authenticatedClient

        queryLoading.value = true
        queryError.value = null

        const { result, loading, error, refetch } = provideApolloClients({
            [clientId]: client,
        })(() =>
            useQuery(graphQLQuery, variables, {
                clientId: clientId,
                ...options,
            }),
        )

        if (error.value) {
            console.error('query error: ', error.value)
        }

        watchEffect(() => {
            queryResult.value = result.value
            queryLoading.value = loading.value
            queryError.value = error.value
        })

        refetchQuery.value = refetch
    }

    const refetch = async () => {
        if (refetchQuery.value) {
            queryLoading.value = true
            try {
                const result = await refetchQuery.value()
                queryResult.value = result.data
            } catch (error) {
                console.error(`Error refetching ${query.name}:`, error)
                queryError.value = error
            } finally {
                queryLoading.value = false
            }
        }
    }

    return {
        result: queryResult,
        loading: queryLoading,
        error: queryError,
        run: runQuery,
        refetch,
    }
}