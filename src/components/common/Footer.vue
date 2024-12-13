<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} Isles of Ilkmaar. All rights reserved.</p>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: var(--concord-blue);
  color: #ffffff;
  text-align: center;
  font-family: museo, helvetica, arial, sans-serif;
  font-size: 14px;
  box-sizing: border-box;
}
</style>