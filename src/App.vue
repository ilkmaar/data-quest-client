<template>
  <div class="app-container">
    <NavBar />
    <div class="content-container">
      <router-view />
    </div>
    <FooterBar />
  </div>
</template>

<script setup>
  import NavBar from './components/common/NavBar.vue'
  import FooterBar from './components/common/FooterBar.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center;     /* Center content horizontally if needed */
  text-align: center;      /* Optional: center text content */
}

footer {
  margin-top: auto;
}
</style>