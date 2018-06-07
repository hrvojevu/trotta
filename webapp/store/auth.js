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
    async logout({ commit }) {
      console.log('logout');

      try {
        await this.$axios.$delete('/auth');
      } catch (error) {
        console.log(error);
      }
      console.log('logout 1');
      // ne zove drugi console, jer je async funkcija

      commit('setUser', null);
    },
  },
  mutations: {
    setUser: (state, user) => {
      console.log('setuser');
      state.authUser = user;
    }
  }
};

export default auth;
