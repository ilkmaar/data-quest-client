import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [vue()],
  define: {
    'process.env.VUE_APP_SUPABASE_URL': JSON.stringify(process.env.VUE_APP_SUPABASE_URL),
    'process.env.VUE_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VUE_APP_SUPABASE_ANON_KEY),
    'process.env.VUE_APP_SERVER_URL': JSON.stringify(process.env.VUE_APP_SERVER_URL),
    'process.env.VUE_APP_FV_JWT_KEY': JSON.stringify(process.env.VUE_APP_FV_JWT_KEY),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});