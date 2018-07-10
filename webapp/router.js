/*
  eslint-disable import/prefer-default-export
*/

import Vue from 'vue';
import Router from 'vue-router';

import Home from '~/home';
import Login from '~/auth/login';
import Pool from '~/pool/pool-main.vue';
import PoolView from '~/pool/pool-view.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/bazeni/:type',
        component: Pool,
        children: [{
          path: ':id',
          component: PoolView,
        }],
      },
      {
        path: '*',
        redirect: { path: '/' },
      },
    ]
  });
}
