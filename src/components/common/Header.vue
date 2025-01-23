<template>
  <header class="header" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
    <div class="logo">
      <!-- Conditionally render the title as a router-link or plain h1 -->
      <router-link
        v-if="pageTitle === 'Isles of Ilkmaar Data Portal'"
        to="/"
        class="logo-link"
      >
        <h1>{{ pageTitle }}</h1>
      </router-link>
      <h1 v-else>{{ pageTitle }}</h1>
    </div>

    <!-- Mobile menu button -->
    <button
      class="mobile-menu-toggle"
      @click="toggleMobileMenu"
      aria-label="Toggle navigation menu"
      :aria-expanded="isMobileMenuOpen"
    >
      <span class="hamburger"></span>
    </button>

    <!-- Navigation wrapper with mobile support -->
    <div class="nav-wrapper" :class="{ active: isMobileMenuOpen }">
      <!-- Conditionally render the navigation links -->
      <nav class="navigation" role="navigation" v-if="!isMyGamesPage">
        <router-link
          to="/about"
          class="nav-item nav-link"
          @click="closeMobileMenu"
          >About</router-link
        >
        <router-link
          to="/resources"
          class="nav-item nav-button"
          @click="closeMobileMenu"
          >Resources</router-link
        >
      </nav>

      <div v-if="isAuthenticated" class="account-menu-container">
        <AccountMenu
          :isMenuOpen="isAccountMenuOpen"
          @toggle-menu="toggleAccountMenu"
          @close-menu="closeAccountMenu"
        />
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

<style scoped>
.header {
  background: linear-gradient(90deg, #1a365d, #2c5282);
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo h1 {
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  margin: 0;
}

.logo-link {
  text-decoration: none;
  color: inherit; /* Inherit color to maintain styling */
}

.nav-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-button {
  background: var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.account-menu-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
}

/* Mobile menu button */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  z-index: 100;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #ffffff;
  position: relative;
  transition: background-color 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #ffffff;
  transition: transform 0.3s;
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  bottom: -6px;
}

/* Mobile styles */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .nav-wrapper {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 80%;
    max-width: 300px;
    background-color: var(--header-color);
    flex-direction: column;
    justify-content: flex-start;
    padding: 5rem 2rem 2rem;
    transition: right 0.3s ease;
    z-index: 90;
  }

  .nav-wrapper.active {
    right: 0;
  }

  .navigation {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .nav-item {
    width: 100%;
    padding: 1rem 0;
  }

  .nav-button {
    width: 100%;
    justify-content: center;
  }

  .account-menu-container {
    margin: 1rem 0 0 0;
    width: 100%;
  }

  /* Mobile menu open state */
  .mobile-menu-open .hamburger {
    background-color: transparent;
  }

  .mobile-menu-open .hamburger::before {
    transform: translateY(6px) rotate(45deg);
  }

  .mobile-menu-open .hamburger::after {
    transform: translateY(-6px) rotate(-45deg);
  }
}

/* Handle larger screens */
@media (min-width: 1200px) {
  .header {
    padding: 1rem 4rem;
  }
}

/* Reduce motion if user prefers */
@media (prefers-reduced-motion: reduce) {
  .nav-wrapper,
  .nav-item,
  .hamburger,
  .hamburger::before,
  .hamburger::after {
    transition: none;
  }
}
</style>
