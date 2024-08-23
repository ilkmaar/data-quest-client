<template>
  <div class="login-page">
    <div class="content">
      <h2>Login to Your Account</h2>
      <p class="login-description">Login with your Discord account to access your dashboard.</p>
      <DiscordLoginButton />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import DiscordLoginButton from './DiscordLoginButton.vue'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    router.push('/my-games')
  }
}, { immediate: true })
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #4a90e2, #14567a);
  color: white;
  text-align: center;
}

.content {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.login-description {
  font-size: 1.25rem;
  color: #a0aec0;
  margin-bottom: 1.5rem;
}
</style>