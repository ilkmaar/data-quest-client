<template>
  <div class="app-container">
    <Header />
    <div class="content-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  color: rgb(8, 13, 9);
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>åå