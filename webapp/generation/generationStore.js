const generationStore = {
  namespaced: true,
  state: {
    generations: [],
  },
  getters: {
    getById: (state) => state.generations.reduce((acc, g) => acc.set(g.id, g), new Map()),
  },
  actions: {
    async list({ commit }) {
      const generations = await this.$axios.$get('/generations?pools=true');

      commit('set', generations);
    },
  },
  mutations: {
    set: (state, generations) => {
      state.generations = generations;
    },
  }
};

export default generationStore;
