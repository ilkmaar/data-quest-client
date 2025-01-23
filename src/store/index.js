// store/index.js
import { createStore } from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import admin from "./modules/admin";
import world from "./modules/world";

export default createStore({
  modules: {
    auth,
    user,
    admin,
    world,
  },
});
