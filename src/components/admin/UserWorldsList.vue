<template>
  <div class="worlds-list">
    <WorldLink
      v-for="player in playerWorlds"
      :key="player.id"
      :player="player"
      @click="handleClick(player.id, player.name, player.world.id, player.world.name)"
    />
  </div>
</template>

<script setup>
import WorldLink from './WorldLink.vue'

const props = defineProps({
  playerWorlds: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['world-click'])
const handleClick = (player_id, player_name, world_id, world_name) => {
  emit('world-click', { player_id, player_name, world_id, world_name })
}
</script>

<style scoped>
.worlds-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--world-link-width), 1fr));
    gap: 10px;
    align-items: start;
    justify-items: start;
}
</style>