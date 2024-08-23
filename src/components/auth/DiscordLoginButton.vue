<template>
  <button @click="loginWithDiscord" class="login-button discord">
    <img src="/icons/discord-logo.svg" alt="Discord" class="logo" />
    Login with Discord
  </button>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const loginWithDiscord = async () => {
  try {
    await store.dispatch('auth/loginWithDiscord')
  } catch (error) {
    console.error('Discord login failed:', error)
  }
}
</script>

<style scoped>
.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button.discord {
  background-color: #7289da;
}

.login-button.discord:hover {
  background-color: #5c6fb1;
}

.logo {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
}
</style>