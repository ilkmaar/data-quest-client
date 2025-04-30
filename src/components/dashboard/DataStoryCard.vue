<template>
  <div class="story" :class="{ 'breaking-news': isBreaking }">
    <div v-if="isBreaking" class="news-badge">Breaking News</div>
    <h2 class="story-title">{{ title }}</h2>
    <h3 v-if="subtitle" class="story-subtitle">{{ subtitle }}</h3>

    <div class="story-content">
      <p class="story-text">{{ content }}</p>

      <div v-if="$slots.visualization" class="visualization-container">
        <slot name="visualization"></slot>
      </div>

      <div v-if="$slots.sidebar" class="story-sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>

    <div v-if="callToAction" class="story-cta">
      <button class="cta-button" @click="$emit('action-clicked')">
        {{ callToAction }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    required: true,
  },
  isBreaking: {
    type: Boolean,
    default: false,
  },
  callToAction: {
    type: String,
    default: "",
  },
});

defineEmits(["action-clicked"]);
</script>

<style scoped>
.story {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
}

.breaking-news {
  border: 2px solid #fc8181;
}

.news-badge {
  position: absolute;
  top: -12px;
  left: 20px;
  background: linear-gradient(135deg, #fc8181, #f56565);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
}

.story-title {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.story-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.visualization-container {
  width: 100%;
  margin: 1rem 0;
}

.story-text {
  color: #4a5568;
  line-height: 1.6;
}

.story-cta {
  margin-top: 1.5rem;
}

.cta-button {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(56, 161, 105, 0.3);
}

@media (max-width: 768px) {
  .story-content {
    grid-template-columns: 1fr;
  }
}
</style>
