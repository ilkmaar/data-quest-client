<template>
  <div class="world-management-container">    
    <!-- Show loading component while worlds are loading -->
    <LoadingSpinner v-if="worlds.length === 0" />

    <!-- Show WorldSelector and WorldCard once worlds have loaded -->
    <template v-else>
      <WorldSelector
        :worlds="worlds"
        :selectedWorld="selectedWorld"
        @select-world="selectWorld"
      />

      <WorldCard v-if="selectedWorld"
        :world="selectedWorld"
        @assignPlayerToUser = "handleAssignPlayerEvent"
        @open-add-user-modal="openAddUserModal"
        @removeUser="handleRemoveUserFromWorld"
      />
      <div v-else>
        No World Selected...
      </div>
    </template>
  </div>

  <!-- Add User Modal -->
  <AddUserModal
    v-if="isAddUserModalOpen"
    :availableUsers="users"
    @close="closeAddUserModal"
    @addUser="handleSelectUser"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useWorldManagement } from '@/composables/useWorldManagement'
import WorldCard from '../components/admin/WorldCard.vue'
import AddUserModal from '../components/admin/AddUserModal.vue'
import WorldSelector from '../components/admin/WorldSelector.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const { users, fetchAllUsers, worlds, fetchAllWorlds, assignPlayerToUser, addUserToWorld, removeUserFromWorld } = useWorldManagement()

const isAddUserModalOpen = ref(false)
const selectedWorld = ref(null)
const selectedUser = ref(null)
const modalContext = ref('')
const currentAssignPlayerId = ref(null)
const worldPlayers = computed(() => selectedWorld.value?.players || [])

onMounted(async () => {
    await Promise.all([fetchAllWorlds(), fetchAllUsers()])
    selectDefaultWorld()
})

watch(worlds, (newWorlds) => selectDefaultWorld(newWorlds))

const selectWorld = (world) => {
  selectedWorld.value = world
}

const selectDefaultWorld = (newWorlds = worlds.value) => {
  if (newWorlds.length > 0 && !selectedWorld.value) {
    selectedWorld.value = newWorlds[0]
  }
}

const openAddUserModal = (context) => {
    modalContext.value = context
    isAddUserModalOpen.value = true
}

const closeAddUserModal = () => {
    isAddUserModalOpen.value = false
    selectedUser.value = null
    modalContext.value = ''
    currentAssignPlayerId.value = null
}

const handleSelectUser = async (userId) => {
    if (modalContext.value === 'addToWorld') {
        await handleAddUserToWorld(userId)
    } else if (modalContext.value === 'assignToPlayer' && currentAssignPlayerId.value) {
      
    await assignPlayerToUser(userId, currentAssignPlayerId.value)
        closeAddUserModal()
        await fetchAllWorlds()
        selectWorld(selectedWorld.value)
    }
}

const handleAssignPlayerToUser = async (playerId) => {  
  if (selectedUser.value && selectedWorld.value) {
    await assignPlayerToUser({ userId: selectedUser.value.id, playerId })
    closeAddUserModal()
    await fetchAllWorlds() // To refresh the data
    selectWorld(selectedWorld.value) // Re-select the current world to update view
  }
}

const handleAddUserToWorld = async (userId) => {
  if (selectedWorld.value && userId) {
    await addUserToWorld(userId, selectedWorld.value.id)
    closeAddUserModal()
    await fetchAllWorlds()
    selectWorld(selectedWorld.value)
  }
}

const handleRemoveUserFromWorld = async (worldId, userId) => {
  if (worldId && userId) {
    await removeUserFromWorld(userId, worldId)
    await fetchAllWorlds()
    selectWorld(worlds.value.find((world) => world.id === worldId))
  }
}

const handleAssignPlayerEvent = (playerId) => {
  currentAssignPlayerId.value = playerId
  openAddUserModal('assignToPlayer')
}
</script>

<style scoped>
.world-management-container {
    display: flex;
    height: calc(100vh - var(--navbar-height) - var(--footer-height));
    width: 100%;
    padding: 5px;
    overflow: hidden;
}

.loading-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    color: #888;
    width: 100%;
    min-height: 100%;
}

.world-selector-placeholder {
    flex: 1;
    width: 33.33%;
    min-height: 100%;
}

.world-card-placeholder {
    flex: 2;
    width: 66.66%;
    min-height: 100%;
    padding-left: 16px;
}

.WorldSelector {
    flex: 1;
    width: 33.33%;
    overflow-y: auto;
}

.WorldCard {
    flex: 2;
    width: 66.66%;
    padding-left: 16px;
    overflow-y: auto;
    background-color: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-lg {
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.AddUserModal {
    width: 100%;
}

.loading-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    color: #888;
}

.world-selector-placeholder {
    width: 33.33%;
    height: calc(100vh - var(--navbar-height) - var(--footer-height));
}

.world-card-placeholder {
    width: 66.66%;
    padding-left: 16px;
    height: calc(100vh - var(--navbar-height) - var(--footer-height));
}
</style>