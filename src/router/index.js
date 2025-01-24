import { createRouter, createWebHashHistory } from "vue-router";
import { useStore } from "vuex";
import LandingPage from "@/views/LandingPage.vue";
import MyGames from "@/views/MyGames.vue";
import GameWorld from "@/views/GameWorld.vue";
import WorldDashboard from "@/views/WorldDashboard.vue";
import PlayerProfile from "@/views/PlayerProfile.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/about", component: LandingPage },
  { path: "/resources", component: LandingPage },
  { path: "/my-games", component: MyGames, meta: { requiresAuth: true } },
  {
    path: "/world/:worldId?",
    component: WorldDashboard,
    meta: { requiresAuth: true },
    props: true,
  },
  { path: "/profile", component: PlayerProfile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const store = useStore();

  // Wait for the authentication state to be ready
  await store.dispatch("auth/checkAuth");

  // Check if worldId parameter exists and dispatch to world store
  if (to.params.worldId) {
    console.log("[router] route worldId: ", to.params.worldId);
    await store.dispatch("world/setCurrentWorldId", {
      worldId: to.params.worldId,
    });
  }

  proceedNavigation(to, next, store);
});

function proceedNavigation(to, next, store) {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  // Redirect authenticated users away from login and root paths
  if (isAuthenticated && to.path === "/") {
    next({ path: "/my-games" });
  }
  // Check if the route requires authentication
  else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: "/" });
    } else {
      next();
    }
  }
  // Proceed to the next middleware or route
  else {
    next();
  }
}

export default router;
