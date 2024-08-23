import { ref, watchEffect } from 'vue'
import { useMutation, provideApolloClients } from '@vue/apollo-composable'
import { unauthenticatedClient, authenticatedClient } from '../../graphql/apollo.js'

export function useDefinedMutation(mutation, variables = {}) {
    const mutationResult = ref(null)
    const mutationLoading = ref(false)
    const mutationError = ref(null)

    const graphQLMutation = mutation.query

    const clientId = mutation.client === 'unauthenticated' ? 'unauthenticated' : 'authenticated'
    const client = clientId === 'unauthenticated' ? unauthenticatedClient : authenticatedClient

    const { mutate, loading, error, onDone, onError } = provideApolloClients({
        [clientId]: client,
    })(() =>
        useMutation(graphQLMutation, {
            clientId: clientId,
        }),
    )

    watchEffect(() => {
        mutationLoading.value = loading.value
        mutationError.value = error.value
    })

    onDone((result) => {
        mutationResult.value = result.data
    })

    onError((error) => {
        console.error('Mutation error details:', error.message)
        console.error('Mutation error graphQLErrors:', error.graphQLErrors)
        console.error('Mutation error networkError:', error.networkError)
        console.error('Mutation error extraInfo:', error.extraInfo)
        mutationError.value = error
    })

    const run = (vars = variables) => {
        mutationResult.value = null
        mutationLoading.value = true
        mutationError.value = null
        mutate(vars).catch((error) => {
            console.error('Mutation error caught:', error.message)
            console.error('Mutation error graphQLErrors:', error.graphQLErrors)
            console.error('Mutation error networkError:', error.networkError)
            console.error('Mutation error extraInfo:', error.extraInfo)
        })
    }

    return {
        result: mutationResult,
        loading: mutationLoading,
        error: mutationError,
        run,
    }
}