// src/composables/useAccountMenu.js
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { PLACEHOLDER_AVATAR_URL } from '../config';

export function useAccountMenu() {
  const store = useStore();
  const router = useRouter();

  const isLoggedIn = computed(() => store.getters['auth/isAuthenticated'] || false);
  const avatarUrl = computed(() => store.getters['auth/avatarUrl'] || PLACEHOLDER_AVATAR_URL);

  const logoutAndCloseMenu = async (emitCloseMenu) => {
    await store.dispatch('auth/initiateLogout');
    router.push('/');
    emitCloseMenu();
  };

  return {
    isLoggedIn,
    avatarUrl,
    logoutAndCloseMenu
  };
}