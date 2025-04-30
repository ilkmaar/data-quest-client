import { createApp, provide, h } from "vue";
import { ApolloClients } from "@vue/apollo-composable";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import {
  authenticatedClient,
  unauthenticatedClient,
} from "./graphql/apollo.js";

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: authenticatedClient,
      authenticated: authenticatedClient,
      unauthenticated: unauthenticatedClient,
    });
  },
  render: () => h(App),
});

app.use(store);
app.use(router);

// Single initialization point
store
  .dispatch("auth/init")
  .then(() => store.dispatch("auth/checkAuth"))
  .then(() => {
    app.mount("#app");
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
    app.mount("#app");
  });
