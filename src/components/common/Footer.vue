<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img
          src="@/assets/logo.svg"
          alt="Ilkmaar Logo"
          class="footer-logo-img"
        />
        <p class="footer-copyright">
          &copy; {{ currentYear }} Isles of Ilkmaar
        </p>
      </div>
      <div class="footer-links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: linear-gradient(
    135deg,
    var(--primary-blue),
    var(--primary-blue-dark)
  );
  color: var(--text-light);
  padding: 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-logo-img {
  height: 40px;
  width: auto;
}

.footer-copyright {
  font-size: 0.875rem;
  opacity: 0.9;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.875rem;
  opacity: 0.9;
  transition: var(--transition-base);
}

.footer-links a:hover {
  opacity: 1;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
