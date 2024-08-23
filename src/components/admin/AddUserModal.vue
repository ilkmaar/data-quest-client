<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Modal content -->
    <div class="relative z-10 flex items-center justify-center p-4 bg-white">
      <div>
        <div>
          <select v-model="selectedUser">
            <option v-for="user in availableUsers" :key="user.id" :value="user">
              {{ user.name }} - {{ user.email }}
            </option>
          </select>
        </div>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="selectUser" :disabled="!selectedUser">
            Select User
          </button>
          <button @click="$emit('close')">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
    availableUsers: Array
})

const emit = defineEmits(['close', 'addUser'])
const selectedUser = ref(null)

const selectUser = () => {
  if (selectedUser.value) {
    console.log("selecting user", selectedUser.value)
    emit('addUser', selectedUser.value.id)
  }
}
</script>

<style scoped>
.AddUserModal {
  width: 100%;
}
</style>