<template>
  <footer class="footer">
    <div class="container text-center">
      <p class="footer-note">
        <img :src="FOOTER_LOGO_URL" alt="Parent Permission" class="footer-icon">
        Ask a parent or guardian for permission!
      </p>
      <p>&copy; {{ currentYear }} Isles of Ilkmaar. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { FOOTER_LOGO_URL } from '@/config'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  height: var(--footer-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--footer-bg-color);
  color: var(--footer-font-color);
  padding: 10px 0;
  margin-top: auto;
  border-top: 1px solid var(--border-color-light);
}

.footer-note {
  font-size: 1rem;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.text-center {
  text-align: center;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>