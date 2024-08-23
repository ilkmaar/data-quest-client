<template>
  <div class="player-profile">
      <h1>Data Dashboard</h1>
      <div v-if="player" class="profile-content">
          <div class="player-info">
              <h2>{{ player.player_name }}</h2>
              <p>World: {{ player.world_name }}</p>
              <p>Level: {{ player.level || 3 }}</p>
              <p>Experience: {{ player.experience || 4 }}</p>
          </div>
          <div class="player-stats">
              <h3>Stats</h3>
              <ul>
                  <li v-for="(value, key) in player.stats" :key="key">{{ key }}: {{ value }}</li>
              </ul>
          </div>
          <div class="player-achievements">
              <h3>Achievements</h3>
              <ul>
                  <li v-for="achievement in player.achievements" :key="achievement.id">
                      {{ achievement.name }} - {{ achievement.description }}
                  </li>
              </ul>
          </div>
      </div>
      <div v-else>
          <p>Loading player data...</p>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const player = computed(() => store.getters['user/player'])
</script>

<style scoped>
.player-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.player-info {
  grid-column: 1 / -1;
}

h1,
h2,
h3 {
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>