// src/composables/useAccountMenu.js
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { PLACEHOLDER_AVATAR_URL } from "../config";

export function useAccountMenu() {
  const store = useStore();
  const router = useRouter();

  const isLoggedIn = computed(
    () => store.getters["auth/isAuthenticated"] || false
  );

  const username = computed(() => {
    return store.getters["auth/username"];
  });

  const email = computed(() => {
    return store.getters["auth/email"];
  });

  const avatarUrl = computed(() => {
    console.log("avatarUrl", store.getters["auth/avatarUrl"]);
    return store.getters["auth/avatarUrl"] || PLACEHOLDER_AVATAR_URL;
  });

  const logoutAndCloseMenu = async (emitCloseMenu) => {
    console.log("logoutAndCloseMenu");
    await store.dispatch("auth/initiateLogout");
    router.push("/");
    emitCloseMenu();
  };

  return {
    isLoggedIn,
    avatarUrl,
    username,
    email,
    logoutAndCloseMenu,
  };
}
