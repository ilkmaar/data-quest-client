// PlayerProfile.vue
<template>
    <div class="profile">
        <h1>Player Profile</h1>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-if="!loading && !error">
            <UserInfo />
        </div>
    </div>
</template >

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import UserInfo from '../components/auth/UserInfo.vue'

const store = useStore()
const loading = ref(store.getters['user/loading'])
const error = ref(store.getters['user/error'])

onMounted(() => {
    store.dispatch('user/fetchPlayerProfile')
})
</script>

<style scoped>
.profile {
    padding: 2em;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-info p {
    margin: 10px 0;
}

.edit-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-button:hover {
    background-color: #0056b3;
}
</style>