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
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";
</script>
