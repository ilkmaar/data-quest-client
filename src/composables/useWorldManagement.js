// src/composables/useWorldManagement.js
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useWorldManagement() {
    const store = useStore()

    const users = computed(() => store.getters['admin/users'])

    const worlds = computed(() => {
        const newWorlds = store.getters['admin/worlds']
        console.log("worlds updated: ", newWorlds)
        return newWorlds
    })

    const fetchAllUsers = () => store.dispatch('admin/fetchAllUsers')
    const fetchAllWorlds = () => store.dispatch('admin/fetchAllWorlds')

    const assignPlayerToUser = (userId, playerId) => store.dispatch('admin/assignPlayerToUser', { userId, playerId });
    
    const addUserToWorld = (userId, worldId) => store.dispatch('admin/addUserToWorld', { userId, worldId });
    
    const removeUserFromWorld = (userId, worldId) =>
        store.dispatch('admin/removeUserFromWorld', { userId, worldId });

    return {
        users,
        worlds,
        assignPlayerToUser,
        fetchAllUsers,
        fetchAllWorlds,
        addUserToWorld,
        removeUserFromWorld,
    }
}