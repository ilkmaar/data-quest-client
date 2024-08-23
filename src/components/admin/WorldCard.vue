<template>
  <div v-if="world.id" class="world-card">
    <div class="world-card-top-bar">
      <h3 class="world-name">{{ world.name }}</h3>
      <div>
        <button
          @click="emitCreateNewPlayer"
          class="create-player-button"
        >
          Create New Player Slot
        </button>
        <button
          @click="emitOpenAddUserModal"
          class="add-user-button"
        >
          Invite User
        </button>
      </div>
    </div>

    <div class="table-container">
      <table class="world-table">
        <thead>
          <tr>
            <th class="table-header">Player Name</th>
            <th class="table-header">User Email</th>
            <th class="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in world.players" :key="player.id" class="table-row">
            <td class="table-cell">{{ player.name }}</td>
            <td class="table-cell">
              {{ player.user ? player.user.email : 'Unclaimed' }}
            </td>
            <td class="table-cell actions-cell">
              <button
                v-if="player.user"
                @click="emitRemoveUser(player.id)"
                class="remove-user-button"
              >
                Remove
              </button>
              <button
                v-else
                @click="emitAssignPlayerToUser(player.id)"
                class="assign-user-button"
              >
                Assign User
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <p v-else class="text-gray-500">Loading worlds...</p>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  world: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open-add-user-modal', 'create-new-player', 'removeUser', 'assignPlayerToUser'])

const emitOpenAddUserModal = () => {
  emit('open-add-user-modal', props.world)
}

const emitCreateNewPlayer = () => {
  emit('create-new-player', props.world?.id)
}

const emitRemoveUser = (playerId) => {
  emit('removeUser', props.world?.id, playerId)
}

const emitAssignPlayerToUser = (playerId) => {
  emit('assignPlayerToUser', playerId)
}
</script>

<style scoped>
.world-card {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    max-height: calc(100vh - var(--navbar-height) - var(--footer-height));
    overflow-y: auto;
    width: 66.66%; /* Set to 2/3 of the screen width */
    flex-shrink: 0; /* Prevents shrinking */
}

.world-card-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.world-name {
  font-size: 1.125rem;
  font-weight: 600;
}

.add-user-button,
.create-player-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
}

.add-user-button {
  background-color: #3b82f6;
}

.add-user-button:hover {
  background-color: #2563eb;
}

.create-player-button {
  background-color: #10b981;
  margin-left: 0.5rem;
}

.create-player-button:hover {
  background-color: #059669;
}

.table-container {
  overflow-x: auto;
}

.world-table {
  min-width: 100%;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

.table-header {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  background-color: #e5e7eb;
}

.table-row {
  border-top: 1px solid #e5e7eb;
}

.table-cell {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  color: #374151;
}

.actions-cell {
  text-align: right;
}

.remove-user-button,
.assign-user-button {
  font-size: 0.875rem;
  font-weight: 500;
}

.remove-user-button {
  color: #ef4444;
}

.remove-user-button:hover {
  color: #b91c1c;
}

.assign-user-button {
  color: #3b82f6;
}

.assign-user-button:hover {
  color: #2563eb;
}
</style>