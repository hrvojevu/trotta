import Vuex from 'vuex';

import auth from './auth';

const store = () => new Vuex.Store({
  actions: {
    nuxtServerInit({ commit }, { req }) {
      if (req.session && req.session.authUser) commit('auth/setUser', req.session.authUser);
      else commit('auth/setUser', null);
    },
  },
  modules: {
    auth,
  },
});

export default store;
