<template>
  <nav class="navbar">
    <div class="navbar-left">
      <template v-if="isResearcher">
        <Disclosure as="div" v-slot="{ open, close }">
          <DisclosureButton class="menu-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 12H21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 18H21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </DisclosureButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <DisclosurePanel class="side-menu">
              <div class="nav-links">
                <template v-if="isAuthenticated">
                  <router-link to="/my-games" exact-active-class="active" @click="close">My Guild Games</router-link>
                  <router-link
                    v-if="isResearcher"
                    to="/user-management"
                    exact-active-class="active"
                    @click="close"
                  >
                    User Management
                  </router-link>
                  <router-link
                    v-if="isResearcher"
                    to="/world-management"
                    exact-active-class="active"
                    @click="close"
                  >
                    World Management
                  </router-link>
                </template>
              </div>
            </DisclosurePanel>
          </transition>
        </Disclosure>
      </template>

      <div v-if="isLandingPage" class="logo">DataQuest</div>
      <div v-else class="logo">My Games</div>
    </div>

    <AccountMenu 
      v-if="!isLandingPage" 
      :isMenuOpen="isAccountMenuOpen" 
      @toggle-menu="toggleAccountMenu" 
      @close-menu="closeAccountMenu"
    />
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import AccountMenu from '../auth/AccountMenu.vue'

const store = useStore()
const route = useRoute()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const isResearcher = computed(() => store.getters['user/isResearcher'])

const isLandingPage = computed(() => route.path === '/')
const isAccountMenuOpen = ref(false)
  
const toggleAccountMenu = () => {
  isAccountMenuOpen.value = !isAccountMenuOpen.value
}

const closeAccountMenu = () => {
  isAccountMenuOpen.value = false
}
</script>

<style scoped>  
.navbar {
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    background-color: var(--nav-bar-color);
    padding: 0.75em 1.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
    color: var(--font-color);
    font-size: 2em;
    font-weight: bold;
    margin-left: 15px;
}

.menu-button,
.logo-link {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5em;
  transition: opacity 0.3s;
}

.menu-button:hover,
.logo-link:hover {
  opacity: 0.8;
}

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: var(--side-menu-color);
  z-index: 1000;
  padding-top: 1em;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.nav-links {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.nav-links a {
  color: var(--font-color);
  text-decoration: none;
  padding: 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: var(--button-hover-bg-color);
}

.nav-links a.active {
  background-color: var(--secondary-color);
}
</style>