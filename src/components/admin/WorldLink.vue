<template>
  <div class="polaroid-card" @click="handleClick">
    <div class="polaroid-content">
      <div
        class="polaroid-image"
        :style="{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }"
      ></div>
      <div class="separator-line"></div>
      <div class="polaroid-caption">
        <p class="world-name">{{ player.world.name }}</p>
        <p class="player-name">{{ player.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BACKGROUND_IMAGE_URL } from '@/config'

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.polaroid-card {
  position: relative;
  display: inline-block;
  width: var(--world-link-width);
  padding: 15px 10px;
  background-color: var(--polaroid-bg-color);
  border-radius: var(--content-border-radius);
  border: 4px solid var(--polaroid-border-color);
  box-shadow: var(--content-box-shadow);
  cursor: pointer;
  transition: transform var(--transition-duration), box-shadow var(--transition-duration);
  text-align: center;
}

.polaroid-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.polaroid-content {
  border-radius: var(--content-border-radius);
  overflow: hidden;
}

.polaroid-image {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  border-radius: var(--content-border-radius) var(--content-border-radius) 0 0;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.1);
}

.separator-line {
  height: 4px;
  background-color: var(--polaroid-border-color-light);
}

.polaroid-caption {
  color: var(--polaroid-text-color);
  font-size: 1.1rem;
  font-weight: bold;
  padding-top: 5px;
  border-radius: 0 0 var(--content-border-radius) var(--content-border-radius);
  background-color: var(--info-bg-color); /* Light gray background */
  padding: 8px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
