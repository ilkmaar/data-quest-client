import authenticationService from "@/services/authenticationService";

const state = {
  user: null,
  token: null,
  isAuthenticated: false,
  loadingAuth: true,
  error: null,
  authCheckPromise: null,
};

const mutations = {
  SET_USER(state, user) {
    console.log("setting user: ", user);
    state.user = user;
    state.isAuthenticated = !!user;
  },
  SET_TOKEN(state, token) {
    console.log("setting token: ", token);
    state.token = token;
  },
  SET_LOADING_AUTH(state, loadingAuth) {
    state.loadingAuth = loadingAuth;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  init({ dispatch }) {
    console.log("auth storeinit");
    authenticationService.init(
      (user, token) => {
        dispatch("localLogin", { user, token });
      },
      () => dispatch("localLogout")
    );
  },

  uninit() {
    authenticationService.uninit();
  },

  async checkAuth({ commit, dispatch, state }) {
    console.log("auth store checkAuth");

    // If there's already a check in progress, return that promise
    if (state.authCheckPromise) {
      return state.authCheckPromise;
    }

    commit("SET_LOADING_AUTH", true);

    // Store the promise in state
    state.authCheckPromise = (async () => {
      try {
        const { user, token } = await authenticationService.checkAuth();
        if (user && token) {
          await dispatch("localLogin", { user, token });
        } else {
          await dispatch("localLogout");
        }
      } catch (err) {
        console.error(err);
        commit("SET_ERROR", err);
      } finally {
        commit("SET_LOADING_AUTH", false);
        state.authCheckPromise = null; // Clear the promise
      }
    })();

    return state.authCheckPromise;
  },

  async localLogin({ state, commit, dispatch }, { user, token }) {
    console.log("auth store localLogin");
    // Check if the user is already logged in and the same user is being passed
    if (state.user?.id === user.id) {
      return;
    }

    // If the user is different or not logged in, proceed with setting the user and token
    commit("SET_USER", user);
    commit("SET_TOKEN", token);

    // Fetch user data only if authenticated
    if (user) {
      dispatch("user/fetchUserData", user.id, { root: true });
    }
  },

  async localLogout({ commit }) {
    console.log("localLogout");
    commit("SET_USER", null);
    commit("SET_TOKEN", null);
    commit("user/RESET_USER_DATA", null, { root: true });
  },

  async loginWithDiscord() {
    console.log("loginWithDiscord");
    await authenticationService.loginWithDiscord();
  },

  async studyLogin({ dispatch }, { email, username }) {
    console.log("studyLogin");
    const data = await authenticationService.studyLogin(email, username);
    console.log("data: ", data);
    dispatch("localLogin", {
      user: data.user,
      token: data.token,
    });
  },

  async signUpWithCredentials({ dispatch }, { email, password }) {
    console.log("signUpWithCredentials");
    await authenticationService.signUpWithPassword(email, password);
  },

  async initiateLogout({ dispatch }) {
    console.log("initiateLogout");
    try {
      await authenticationService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch("localLogout");
    }
  },

  async handleSignoutEvent({ state, dispatch }) {
    console.log("handleSignoutEvent");
    if (!state.isAuthenticated) {
      return;
    }
    await dispatch("localLogout");
  },
};

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  email: (state) => state.user?.email,
  username: (state) =>
    state.user ? state.user?.user_metadata?.full_name : null,
  avatarUrl: (state) =>
    state.user && state.user?.user_metadata?.avatar_url
      ? state.user?.user_metadata?.avatar_url
      : null,
  loadingAuth: (state) => state.loadingAuth,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
