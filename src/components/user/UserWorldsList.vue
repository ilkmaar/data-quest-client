<template>
  <div class="worlds-list">
    <WorldLink
      v-for="player in playerWorlds"
      :key="player.id"
      :player="player"
      @click="
        handleClick(player.id, player.name, player.world.id, player.world.name)
      "
    />
  </div>
</template>

<script setup>
import WorldLink from "./WorldLink.vue";

const props = defineProps({
  playerWorlds: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["world-click"]);

const handleClick = (player_id, player_name, world_id, world_name) => {
  emit("world-click", { player_id, player_name, world_id, world_name });
};
</script>

<style scoped>
.worlds-list {
  display: grid;
  /* Use auto-fit to fill the row with as many columns as possible */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px; /* Increased gap for better spacing */
  padding: 16px; /* Added padding for inner spacing */
  justify-items: start; /* Align items to the left */
  align-items: start; /* Align items to the top */
  box-sizing: border-box; /* Ensure padding is included in the total width */
}

/* Optional: Make sure WorldLink components are responsive */
.worlds-list > * {
  width: 100%;
  max-width: 300px; /* Optional max width for each card */
  box-sizing: border-box;
}
</style>
