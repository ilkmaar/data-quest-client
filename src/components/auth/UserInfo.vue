<template>
  <div class="user-info">
    <img :src="avatarUrl" alt="User Avatar" class="avatar"/>
    <div class="details">
      <p class="username">{{ username }}</p>
      <p class="email">{{ email }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const avatarUrl = computed(() => store.getters['auth/avatarUrl']);
const username = computed(() => store.getters['auth/username']);
const email = computed(() => store.getters['auth/email']);
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.details {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  margin: 0;
}

.email {
  color: gray;
  margin: 0;
  font-size: 0.85rem;
}
</style>