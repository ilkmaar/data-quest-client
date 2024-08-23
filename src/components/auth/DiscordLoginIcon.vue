<template>
  <img
    src="/icons/discord-logo.svg"
    alt="Discord"
    @click="loginWithDiscord"
    class="discord-logo"
  />
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
.discord-logo {
  width: 32px; /* Adjust the size of the logo as needed */
  height: 32px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.discord-logo:hover {
  opacity: 0.8;
}
</style>