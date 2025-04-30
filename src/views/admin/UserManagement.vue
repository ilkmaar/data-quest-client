<template>
  <div class="user-management-container">
    <!-- Show loading component while users are loading -->
    <LoadingSpinner v-if="users.length === 0" />

    <!-- Show table of users once loaded -->
    <template v-else>
      <table class="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Players and Worlds</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>
              <table>
                <tr v-for="player in user.players" :key="player.id">
                  <td>{{ player.name }}</td>
                  <td>{{ player.world.name }}</td>
                </tr>
              </table>
            </td>
            <td>
              <button @click="openAssignPlayerModal(user)">Assign Player</button>
              <button @click="removeUserFromWorld(user.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <!-- Add User Modal -->
    <AddUserModal
      v-if="isAddUserModalOpen"
      :availableUsers="availableUsers"
      @close="closeAddUserModal"
      @addUser="handleSelectUser"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWorldManagement } from '@/composables/useWorldManagement'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import AddUserModal from '../components/admin/AddUserModal.vue'

const { users, fetchAllUsers, assignPlayerToUser, removeUserFromWorld } = useWorldManagement()

const isAddUserModalOpen = ref(false)
const selectedUser = ref(null)

onMounted(async () => {
  await fetchAllUsers()
})

const openAssignPlayerModal = (user) => {
  selectedUser.value = user
  isAddUserModalOpen.value = true
}

const closeAddUserModal = () => {
  isAddUserModalOpen.value = false
  selectedUser.value = null
}

const handleSelectUser = async (userId) => {
  if (selectedUser.value) {
    await assignPlayerToUser(userId, selectedUser.value.id)
    closeAddUserModal()
    await fetchAllUsers()
  }
}
</script>

<style scoped>
.user-management-container {
  padding: 20px;
  width: 100%;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.user-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.user-table td {
  text-align: left;
}
</style>