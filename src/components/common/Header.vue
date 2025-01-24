<template>
  <header class="bg-gradient-to-r from-indigo-800 to-indigo-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo section -->
        <div class="flex-shrink-0">
          <router-link
            v-if="pageTitle === 'Isles of Ilkmaar Data Portal'"
            to="/"
            class="text-white font-medium text-lg hover:text-gray-100 transition-colors"
          >
            {{ pageTitle }}
          </router-link>
          <h1 v-else class="text-white font-medium text-lg">
            {{ pageTitle }}
          </h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <nav v-if="!isMyGamesPage" class="flex items-center space-x-4">
            <router-link
              to="/about"
              class="px-3 py-2 rounded-md text-sm text-white hover:bg-indigo-600 transition-colors"
              >About</router-link
            >
            <router-link
              to="/resources"
              class="px-3 py-2 rounded-md text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
              >Resources</router-link
            >
          </nav>

          <!-- Account Menu with circular avatar -->
          <div v-if="isAuthenticated" class="relative ml-4">
            <AccountMenu
              :isMenuOpen="isAccountMenuOpen"
              @toggle-menu="toggleAccountMenu"
              @close-menu="closeAccountMenu"
              class="flex items-center"
            >
              <!-- Add default slot for avatar styling -->
              <template #default="{ avatar }">
                <div
                  class="w-8 h-8 rounded-full overflow-hidden bg-indigo-200 ring-2 ring-white"
                >
                  <img
                    :src="avatar"
                    alt="User avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
              </template>
            </AccountMenu>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 transition-colors"
            aria-label="Main menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      class="md:hidden"
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <template v-if="!isMyGamesPage">
          <router-link
            to="/about"
            class="block px-3 py-2 rounded-md text-base text-white hover:bg-blue-700 transition-colors"
            @click="closeMobileMenu"
            >About</router-link
          >
          <router-link
            to="/resources"
            class="block px-3 py-2 rounded-md text-base font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            @click="closeMobileMenu"
            >Resources</router-link
          >
        </template>
        <div v-if="isAuthenticated" class="pt-4">
          <AccountMenu
            :isMenuOpen="isAccountMenuOpen"
            @toggle-menu="toggleAccountMenu"
            @close-menu="closeAccountMenu"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AccountMenu from "../auth/AccountMenu.vue";

// Store and route setup
const store = useStore();
const route = useRoute();

// Computed properties
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const pageTitle = computed(() =>
  route.path === "/my-games" ? "My Worlds" : "Isles of Ilkmaar Data Portal"
);

// New computed property to check if the current page is My Games
const isMyGamesPage = computed(() => route.path === "/my-games");

// Mobile menu state
const isMobileMenuOpen = ref(false);
const isAccountMenuOpen = ref(false);

// Window resize handling
const handleResize = () => {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Lifecycle hooks for resize listener
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

// Menu handlers
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isAccountMenuOpen.value = false;
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleAccountMenu = () => {
  isAccountMenuOpen.value = !isAccountMenuOpen.value;
  if (isAccountMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

const closeAccountMenu = () => {
  isAccountMenuOpen.value = false;
};
</script>
