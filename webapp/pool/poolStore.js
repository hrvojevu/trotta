import { omit } from 'lodash';

const poolStore = {
  namespaced: true,
  state: {
    pools: [],
    types: [],
  },
  getters: {
    getById: (state) => state.pools.reduce((acc, p) => acc.set(p.id, p), new Map()),
    getTypeById: (state) => state.types.reduce((acc, t) => acc.set(t.id, t), new Map()),
    getTypeByCode: (state) => state.types.reduce((acc, t) => acc.set(t.code, t), new Map()),
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
      const res = await this.$axios.$get('/pools');

      commit('set', res);
    },
    async listTypes({ commit }) {
      const res = await this.$axios.$get('/pools/types');

      commit('setTypes', res);
    },
    async create({ commit, getters }, pool) {
      const res = await this.$axios.$post('/pools', pool);
      // Pool type not returned in the pool object on create
      const type = getters.getTypeById.get(pool.poolTypeId);

      commit('create', { ...res, type });
    },
    async update({ commit }, pool) {
      const res = await this.$axios.$patch(`/pools/${pool.id}`, pool);

      commit('update', res);
    },
    async remove({ commit }, id) {
      await this.$axios.$delete(`/pools/${id}`);

      commit('remove', id);
    },
    async transfer({ commit, dispatch }, transferInfo) {
      const endpoint = `/pools/transfer${transferInfo.initial ? '?initial=true' : ''}`;
      const res = await this.$axios.$post(endpoint, omit(transferInfo, 'initial'));

      dispatch('generation/list', null, { root: true });
      commit('set', res);
    },
  },
  mutations: {
    set: (state, pools) => {
      state.pools = pools;
    },
    setTypes: (state, types) => {
      state.types = types;
    },
    create: (state, pool) => {
      state.pools.push(pool);
    },
    update: (state, pool) => {
      const index = state.pools.findIndex((p) => p.id === pool.id);
      state.pools.splice(index, 1, pool);
    },
    remove: (state, id) => {
      const index = state.pools.findIndex((p) => p.id === id);
      state.pools.splice(index, 1);
    },
  }
};

export default poolStore;
