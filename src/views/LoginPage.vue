<template>
  <div class="login-page">
    <div class="content">
      <h2>{{ isLoginMode ? "Login to Your Account" : "Create an Account" }}</h2>
      <p class="login-description">
        {{
          isLoginMode
            ? "Login with your credentials or Discord account to access your dashboard."
            : "Sign up with your email and password or use Discord to create an account."
        }}
      </p>

      <!-- Email/Password Form -->
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <input
            v-model="credentials.email"
            type="email"
            placeholder="Study Email"
            required
            class="input-field"
          />
        </div>
        <div class="form-group">
          <input
            v-model="credentials.username"
            type="username"
            placeholder="Username"
            required
            class="input-field"
          />
        </div>

        <div class="error-message" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </form>

      <div class="mode-switch">
        <button @click="handleSubmit" class="switch-button">Login</button>
      </div>

      <div class="divider">
        <span>OR</span>
      </div>

      <DiscordLoginButton />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import DiscordLoginButton from "@/components/auth/DiscordLoginButton.vue";

const store = useStore();
const router = useRouter();

const isLoginMode = ref(true);
const credentials = ref({
  email: "",
  username: "",
});

const errorMessage = ref("");

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);

const handleSubmit = async () => {
  try {
    errorMessage.value = "";

    // Add validation check
    if (!credentials.value.email || !credentials.value.username) {
      errorMessage.value = "Please fill in all fields";
      return;
    }

    if (isLoginMode.value) {
      await store.dispatch("auth/studyLogin", credentials.value);
    }
    router.push("/my-games");
  } catch (error) {
    errorMessage.value =
      error.message ||
      `Failed to ${isLoginMode.value ? "login" : "sign up"}. Please try again.`;

    console.log("error: ", error);
  }
};

watch(
  isAuthenticated,
  (newValue) => {
    if (newValue) {
      router.push("/my-games");
    }
  },
  { immediate: true }
);
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #5865f2;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.login-button:hover {
  background: #4752c4;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.divider span {
  padding: 0 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.error-message {
  color: #ff4444;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.mode-switch {
  margin: 1rem 0;
  color: rgba(255, 255, 255, 0.8);
}

.switch-button {
  background: none;
  border: none;
  color: #5865f2;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.5rem;
  text-decoration: underline;
}

.switch-button:hover {
  color: #4752c4;
}
</style>
