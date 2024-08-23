<template>
  <div class="landing-container">
    <div class="content">
      <h1>DataQuest: Isles of Ilkmaar</h1>
      <p class="subtitle">Explore Your Data!</p>
      <DiscordLoginButton v-if="!isAuthenticated" ></DiscordLoginButton>
      <router-link v-else to="/my-games" class="profile-link">Go to My Games</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import DiscordLoginButton from '../auth/DiscordLoginButton.vue'
  
const store = useStore()
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
</script>

<style scoped>
.landing-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: var(--background-color);
    color: var(--color-text);
    text-align: center;
    padding: 0 1rem;
    box-sizing: border-box;
}

.content {
    background: var(--landing-page-content-background);
    padding: var(--content-padding);
    border-radius: var(--content-border-radius);
    box-shadow: var(--content-box-shadow);
}

h1 {
  font-size: var(--heading-font-size);
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.subtitle {
  font-size: var(--subtitle-font-size);
  margin-bottom: 1rem;
  color: var(--color-text);
}

.login-link,
.profile-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: var(--button-padding);
  background-color: var(--button-bg-color);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--button-border-radius);
  transition: background-color var(--transition-duration);
}

.login-link:hover,
.profile-link:hover {
  background-color: var(--button-hover-bg-color);
}
</style>

