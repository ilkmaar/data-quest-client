// store/index.js
import { createStore } from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import admin from './modules/admin'

export default createStore({
    modules: {
        auth,
        user,
        admin
    },
})