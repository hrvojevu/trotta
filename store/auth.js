const auth = {
  namespaced: true,
  state: {
    authUser: null
  },
  getters: {
    user(state) {
      return state.authUser;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const user = await this.$axios.$post('/auth', { username, password });

        commit('setUser', user);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.authUser = user;
    }
  }
};

export default auth;
