<template>
  <div
    @click="$emit('select-world', world)"
    class="world-item"
    :class="{ 'selected-world': isSelected }"
  >
    <div class="top-bar"></div>
    <div class="world-content">
      <div class="world-name">{{ world.name }}</div>
      <div class="world-id">ID: {{ world.id }}</div>
    </div>
    <div class="progress-bars">
      <div class="progress-bar">
        <div class="player-progress" :style="{ width: playerProgress + '%' }"></div>
      </div>
      <div class="progress-bar">
        <div class="user-progress" :style="{ width: userProgress + '%' }"></div>
      </div>
    </div>
    <div class="world-stats">
      <span>{{ world.players.length }} players, {{ claimedSeats }} claimed</span>
      <span>{{ invitedUsers }} invited</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  world: Object,
  isSelected: Boolean,
})

const MAX_PLAYERS = 32

const claimedSeats = computed(() => 
  props.world.players.filter(player => player.user).length
)

const invitedUsers = computed(() => 
  props.world.players.filter(player => !player.user).length
)

const playerProgress = computed(() => 
  (props.world.players.length / MAX_PLAYERS) * 100
)

const userProgress = computed(() => 
  (invitedUsers.value / MAX_PLAYERS) * 100
)
</script>

<style scoped>
.world-item {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  display: grid;
  grid-template-rows: auto auto auto;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  overflow: hidden; /* Ensures contents don't spill out */
}

.selected-world {
  background-color: #eff6ff;
  border-color: #60a5fa;
}

.top-bar {
  height: 4px;
  background-color: #3b82f6;
  border-radius: 0.375rem 0.375rem 0 0;
}

.world-content {
  display: flex;
  display-direction: column;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
  overflow: hidden; /* Ensures text doesn't overflow */
  text-overflow: ellipsis; /* Truncates text if necessary */
  white-space: nowrap; /* Prevents text from wrapping */
}

.world-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.world-id {
  font-size: 0.75rem;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-bars {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 0.25rem;
}

.progress-bar {
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 0.125rem;
  position: relative;
  overflow: hidden; /* Ensures progress bar fill doesn't overflow */
}

.player-progress {
  height: 100%;
  background-color: #10b981;
}

.user-progress {
  height: 100%;
  background-color: #f59e0b;
  position: absolute;
  right: 0;
}

.world-stats {
  font-size: 0.75rem;
  color: #374151;
  display: flex;
  justify-content: space-between;
  overflow: hidden; /* Ensures text doesn't overflow */
  text-overflow: ellipsis; /* Truncates text if necessary */
  white-space: nowrap; /* Prevents text from wrapping */
}
</style>