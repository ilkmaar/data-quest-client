import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.VUE_APP_SUPABASE_URL": JSON.stringify(
      process.env.VUE_APP_SUPABASE_URL
    ),
    "process.env.VUE_APP_SUPABASE_ANON_KEY": JSON.stringify(
      process.env.VUE_APP_SUPABASE_ANON_KEY
    ),
    "process.env.VUE_APP_SERVER_URL": JSON.stringify(
      process.env.VUE_APP_SERVER_URL
    ),
    "process.env.VUE_APP_FV_JWT_KEY": JSON.stringify(
      process.env.VUE_APP_FV_JWT_KEY
    ),
    "process.env.VUE_APP_CLIENT_APP_URL": JSON.stringify(
      process.env.VUE_APP_CLIENT_APP_URL
    ),
    "process.env.VUE_APP_CLIENT_APP_DOMAIN": JSON.stringify(
      process.env.VUE_APP_CLIENT_APP_DOMAIN
    ),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
