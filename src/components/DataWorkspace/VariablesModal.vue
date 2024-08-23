<template>
  <div class="modal-overlay" @click.self="close">
      <div class="modal">
          <header class="modal-header">
              <slot name="header"></slot>
              <button class="close-button" @click="close">&times;</button>
          </header>
          <main class="modal-body">
              <slot name="body"></slot>
          </main>
          <footer class="modal-footer">
              <slot name="footer"></slot>
          </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'VariablesModal',
  props: {
      visible: {
          type: Boolean,
          required: true,
      },
  },
  methods: {
      close() {
          this.$emit('close')
      },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 5px;
  width: 500px;
  max-width: 90%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.modal-body {
  padding: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
      opacity: 0;
      transform: scale(0.9);
  }
  to {
      opacity: 1;
      transform: scale(1);
  }
}
</style>
