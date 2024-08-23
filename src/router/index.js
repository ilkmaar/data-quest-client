import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from 'vuex'
import LandingPage from '@/components/common/LandingPage.vue'
import MyGames from '@/views/MyGames.vue'
import PlayerProfile from '@/views/PlayerProfile.vue'
import UserManagement from '@/views/UserManagement.vue'
import WorldManagement from '@/views/WorldManagement.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/my-games', component: MyGames, meta: { requiresAuth: true } },
    { path: '/profile', component: PlayerProfile, meta: { requiresAuth: true } },
    { path: '/user-management', component: UserManagement, meta: { requiresAuth: true } },
    { path: '/world-management', component: WorldManagement, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
    const store = useStore()

    // Wait for the authentication state to be ready
    await store.dispatch('auth/checkAuth')

    proceedNavigation(to, next, store)
})

function proceedNavigation(to, next, store) {
    const isAuthenticated = store.getters['auth/isAuthenticated'];

    // Redirect authenticated users away from login and root paths
    if (isAuthenticated && to.path === '/') {
        next({ path: '/my-games' });
    }
    // Check if the route requires authentication
    else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ path: '/' });
        } else {
            next();
        }
    }
    // Proceed to the next middleware or route
    else {
        next();
    }
}

export default router