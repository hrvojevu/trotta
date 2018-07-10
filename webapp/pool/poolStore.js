const auth = {
  namespaced: true,
  state: {
    pools: [],
  },
  getters: {
    getById: (state) => state.pools.reduce((acc, p) => acc.set(p.id, p), new Map()),
    poolsByType: (state) => state.pools.reduce((acc, p) => {
      if (acc.has(p.type.code)) {
        acc.get(p.type.code).push(p);

        return acc;
      }

      acc.set(p.type.code, [p]);

      return acc;
    }, new Map()),
  },
  actions: {
    async list({ commit }) {
      const pools = await this.$axios.$get('/pools');

      commit('set', pools);
    },
  },
  mutations: {
    set: (state, pools) => {
      state.pools = pools;
    },
  }
};

export default auth;
