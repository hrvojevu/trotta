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
      const generations = await this.$axios.$get('/generations');

      commit('set', generations);
    },
    async create({ commit }, generation) {
      const data = await this.$axios.$post('/generations', generation);

      commit('create', data);
    },
    async update({ commit }, generation) {
      const data = await this.$axios.$patch(`/generations/${generation.id}`, generation);

      commit('update', data);
    },
  },
  mutations: {
    set: (state, generations) => {
      state.generations = generations;
    },
    create: (state, generation) => {
      state.generations.push(generation);
    },
    update: (state, generation) => {
      const index = state.generations.findIndex((g) => g.id === generation.id);
      state.generations.splice(index, 1, generation);
    },
  }
};

export default generationStore;
