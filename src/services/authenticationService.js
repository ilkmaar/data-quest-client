import { createClient } from '../db/supabase.js'
import { CLIENT_CALLBACK_URL } from '../config/index.js'
import axios from 'axios';

let onLogin = null
let onLogout = null
let authSubscription = null

const authenticationService = {
    init(loginCallback, logoutCallback) {
        // onLogin = loginCallback
        // onLogout = logoutCallback

        // const supabase = createClient()
        // const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        //     console.log("auth state change: ", event, session)
        //     if (session && ['INITIAL_SESSION', 'SIGNED_IN', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
        //         onLogin(session.user, session.access_token)
        //     }

        //     if (['SIGNED_OUT'].includes(event)) {
        //         onLogout()
        //     }
        // })

        // // Store the subscription to unsubscribe later if needed
        // authSubscription = subscription
    },

    uninit() {
        if (authSubscription) {
            authSubscription.unsubscribe()
        }
    },

    async checkAuth() {
        const supabase = createClient()
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
            console.error('Error getting session:', error)
            return { user: null, token: null }
        }
        if (session) {
            return {
                user: session.user,
                token: session.access_token,
            }
        } else {
            return { user: null, token: null }
        }
    },

    async loginWithDiscord() {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: CLIENT_CALLBACK_URL,
            },
        });

        if (error) {
            console.error('Error during Discord login:', error);
            throw error;
        }

        return data;
    },

    async logout() {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error during logout:', error)
            throw error
        }
        document.cookie = ''
        return true
    }
}

export default authenticationService