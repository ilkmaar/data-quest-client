import { createBrowserClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { CLIENT_APP_DOMAIN } from '../config/index.js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing environment variables for Supabase')
}

const getAllCookies = () => {
    const cookieArray = document.cookie.split('; ').map(cookie => {
        const [name, value] = cookie.split('=')
        return name ? { name, value: decodeURIComponent(value) } : null
    }).filter(cookie => cookie !== null)
    return cookieArray
}

const setAllCookies = (cookieObjects) => {
    cookieObjects.forEach(({ name, value, ...options }) => {
        let cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=None; Secure`
        if (options.maxAge) {
            cookie += `; Max-Age=${options.maxAge}`
        }
        if (options.domain) {
            cookie += `; Domain=${options.domain}`
        }
        document.cookie = cookie
    })
}

export const createClient = () => {
    return createBrowserClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll: getAllCookies,
                setAll: setAllCookies,
            },
            cookieOptions: {
                name: "sb-auth-token",
                lifetime: 60 * 60 * 8,
                domain: CLIENT_APP_DOMAIN,
                path: "/",
                sameSite: "None",
                secure: true,
            },
            auth: {
                flowType: 'pkce'
            }
        }
    );
}