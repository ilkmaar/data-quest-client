<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--background-color);
}

.spinner {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid var(--secondary-color);
  border-radius: 50%;
  width: var(--loading-spinner-size);
  height: var(--loading-spinner-size);
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>