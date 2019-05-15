const mortalityStore = {
  namespaced: true,
  state: {
    mortalities: [],
  },
  getters: {},
  actions: {
    async list({ commit }) {
      const res = await this.$axios.$get('/mortality');

      commit('set', res);
    },
    async create({ commit, dispatch }, mortality) {
      const res = await this.$axios.$post('/mortality', mortality);

      commit('create', res);
      dispatch('pool/list', null, { root: true });
    },
  },
  mutations: {
    set: (state, mortalities) => {
      state.mortalities = mortalities;
    },
    create: (state, mortality) => {
      state.mortalities.push(mortality);
    },
  }
};

export default mortalityStore;
