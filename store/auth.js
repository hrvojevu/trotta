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
      const { data } = await this.$axios.$post('/auth', { username, password });

      commit('setUser', data);
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.authUser = user;
    }
  }
};

export default auth;
