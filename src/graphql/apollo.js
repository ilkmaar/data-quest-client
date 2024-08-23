import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { GRAPHQL_URL } from '../config/index.js';
import { createClient } from '../db/supabase.js';
import store from '../store/index.js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create HTTP link
const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'include',
});

// Middleware for logging
const loggingMiddleware = new ApolloLink((operation, forward) => {
    console.log('GraphQL Request:', operation.operationName);
    return forward(operation)
});

// Middleware for auth
const authMiddleware = new ApolloLink(async (operation, forward) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    const storeToken = store.getters['auth/token'];

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : (storeToken ? `Bearer ${storeToken}` : ''),
        },
    });

    return forward(operation);
});

// Create AuthenticatedClient
export const authenticatedClient = new ApolloClient({
    link: ApolloLink.from([loggingMiddleware, authMiddleware, httpLink]),
    cache: new InMemoryCache(),
});

// Create UnauthenticatedClient
export const unauthenticatedClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default { authenticatedClient, unauthenticatedClient };
