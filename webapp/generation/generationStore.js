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
    async create({ commit }, generation) {
      const data = await this.$axios.$post('/generations', generation);

      commit('create', data);
    },
  },
  mutations: {
    set: (state, generations) => {
      state.generations = generations;
    },
    create: (state, generation) => {
      state.generations.push(generation);
    },
  }
};

export default generationStore;
