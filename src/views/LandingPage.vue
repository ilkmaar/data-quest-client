<template>
  <div class="landing-container">
    <div class="content">
      <h2>Explore Your Data in <b>Isles of Ilkmaar</b></h2>
      <p class="subtitle">
        Discover patterns, uncover insights, and become a data explorer. Learn
        how data shapes your game world.
      </p>
      <div v-if="!isAuthenticated">
        <router-link to="/login" class="login-button">
          Start Your Journey
        </router-link>
      </div>
      <router-link v-else to="/my-games" class="profile-button">
        Go to My Games
      </router-link>
    </div>
    <div class="image-section">
      <img
        :src="BACKGROUND_IMAGE_URL"
        alt="Illustration of Isles of Ilkmaar"
        class="main-image"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { BACKGROUND_IMAGE_URL } from "@/config";

const store = useStore();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
</script>

<style scoped>
.landing-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  color: rgb(8, 13, 9);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.content {
  flex: 1;
  max-width: 600px;
  text-align: left;
  padding: 2rem;
  font-family: museo, helvetica, arial, sans-serif;
}

h2 {
  font-size: 54px;
  font-weight: 100;
  color: #1a2a6c;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.subtitle {
  font-size: 24px;
  margin-bottom: 2rem;
  color: rgb(8, 13, 9);
}

.login-button,
.profile-button {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  background-color: #e74c3c;
  color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-button:hover,
.profile-button:hover {
  background-color: #b54020;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.main-image {
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Tablet Styles */
@media (max-width: 1024px) {
  .landing-container {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .content {
    padding: 1.5rem;
  }

  h2 {
    font-size: 44px;
  }

  .subtitle {
    font-size: 20px;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .landing-container {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .content {
    padding: 1rem;
    text-align: center;
  }

  h2 {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
  }

  .image-section {
    order: -1;
    padding: 0;
  }

  .main-image {
    max-width: 100%;
    height: auto;
  }
}
</style>
