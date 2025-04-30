import { createClient } from "../db/supabase.js";
import { CLIENT_CALLBACK_URL } from "../config/index.js";

let onLogin = null;
let onLogout = null;
let authSubscription = null;

const STUDY_PASSWORD = process.env.STUDY_PASSWORD;

const authenticationService = {
  init(loginCallback, logoutCallback) {
    console.log("init authenticationService");
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
      authSubscription.unsubscribe();
    }
  },

  async checkAuth() {
    console.log("authService - checkAuth");
    const supabase = createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return { user: null, token: null };
    }
    if (session) {
      return {
        user: session.user,
        token: session.access_token,
      };
    } else {
      console.log("no session");
      return { user: null, token: null };
    }
  },

  async studyLogin(email, username) {
    console.log("studyLogin - starting with:", { email, username });
    const supabase = createClient();

    // Use the parent email to login with the study password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: STUDY_PASSWORD,
      options: {
        emailRedirectTo: CLIENT_CALLBACK_URL,
      },
    });

    if (error) {
      console.error("Error during login:", error);
      throw error;
    }

    if (!data.user.user_metadata.usernames.includes(username)) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
        throw error;
      }
      document.cookie = "";
      throw new Error("Username not found");
    } else {
      // Enhance the user object with the selected username
      const enhancedUser = {
        ...data.user,
        user_metadata: {
          ...data.user.user_metadata,
          selected_username: username,
        },
      };

      return {
        user: enhancedUser,
        token: data.session.access_token,
      };
    }
  },

  async loginWithDiscord() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: CLIENT_CALLBACK_URL,
      },
    });

    if (error) {
      console.error("Error during Discord login:", error);
      throw error;
    }

    return data;
  },

  async loginWithPassword(email, password) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        emailRedirectTo: CLIENT_CALLBACK_URL,
      },
    });

    if (error) {
      console.error("Error during email/password login:", error);
      throw error;
    }

    return data;
  },

  async signUpWithPassword(email, password) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: CLIENT_CALLBACK_URL,
      },
    });

    if (error) {
      console.error("Error during signup:", error);
      throw error;
    }

    return data;
  },

  async logout() {
    console.log("logging out");
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error during logout:", error);
      throw error;
    }
    document.cookie = "";
    return true;
  },

  // You'll need this to pre-register accounts
  async createStudyAccount(email, usernames) {
    const supabase = createClient();

    // Create the auth account if it doesn't exist
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: STUDY_PASSWORD,
      options: {
        emailRedirectTo: CLIENT_CALLBACK_URL,
        data: {
          usernames,
        },
      },
    });

    if (authError) {
      throw authError;
    }

    console.log("study pw: ", password);

    return { success: true };
  },
};

export default authenticationService;
