<template>
  <div class="my-worlds-container">
    <LoadingSpinner v-if="loading" />
    <UserWorldsList v-else :playerWorlds="games" @world-click="selectWorld" />
    <NoWorlds v-if="!loading && !games.length" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import UserWorldsList from '@/components/admin/UserWorldsList.vue'
import NoWorlds from '@/components/admin/NoWorlds.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { useWorldLinks } from '@/composables/useWorldLinks.js'

const store = useStore()
const { getWorldLink } = useWorldLinks()

const loading = computed(() => store.getters['user/loading'].playerWorlds)
const games = computed(() => store.getters['user/playerWorlds'] || [])

const selectWorld = async (data) => {
  try {
    const link = await getWorldLink(data)
    if (link && link.gameLink) {
      console.log("directing to: ", link.gameLink)
      window.location.href = link.gameLink
    } else {
      console.error('Invalid link returned')
    }
  } catch (error) {
    console.error('Failed to navigate:', error.message)
  }
}
</script>

<style scoped>
.my-worlds-container {
  width: 100%;
  padding: 20px;
  /* Ensure the container uses block layout */
  display: block;
}
</style>