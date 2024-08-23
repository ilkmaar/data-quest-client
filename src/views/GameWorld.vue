<template>
  <div class="game-world">
      <h1>Game World</h1>
      <div class="game-interface">
          <InteractiveGameMap />
      </div>
      <div class="game-actions">
          <button @click="goToGame" class="primary-button">Go to Game</button>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InteractiveGameMap from '../components/game/InteractiveGameMap.vue'
import { FV_GAME_URL } from '../config'

const gameUrl = ref(FV_GAME_URL)

const goToGame = () => {
  window.open(gameUrl.value, '_blank')
}
</script>

<style scoped>
.game-world {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.game-interface {
  width: 80%;
  margin: 20px 0;
}

.game-actions {
  margin-top: 20px;
}

.primary-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.primary-button:hover {
  background-color: #45a049;
}
</style>
