import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import store from './store';
import router from './router';
import { authenticatedClient, unauthenticatedClient } from './graphql/apollo.js';
import './assets/base.css';

const app = createApp({
    setup() {
        provide(ApolloClients, {
            default: authenticatedClient,
            authenticated: authenticatedClient,
            unauthenticated: unauthenticatedClient,
        })
    },
    render: () => h(App),
})

app.use(store)
store.dispatch('auth/init')

// Ensure auth is checked before using the router
store.dispatch('auth/checkAuth').then(() => {
    app.use(router)
    app.mount('#app')
}).catch(error => {
    console.error('Error during auth check:', error)
    app.use(router)
    app.mount('#app')
});