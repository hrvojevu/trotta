const auth = {
  namespaced: true,
  state: {
    generations: [],
  },
  getters: {
    getById: (state) => state.generations.reduce((acc, g) => acc.set(g.id, g), new Map()),
  },
  actions: {
    async list({ commit }) {
      const generations = await this.$axios.$get('/generations');

      commit('set', generations);
    },
  },
  mutations: {
    set: (state, generations) => {
      state.generations = generations;
    },
  }
};

export default auth;
