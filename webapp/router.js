/*
  eslint-disable import/prefer-default-export
*/

import Vue from 'vue';
import Router from 'vue-router';

import GenerationMain from '~/generation/generation-main';
import HomeMain from '~/home';
import LoginMain from '~/auth/login';
import MortalityMain from '~/mortality/mortality-main';
import PoolMain from '~/pool/pool-main';
import PoolView from '~/pool/pool-view';
import SpawnMain from '~/spawn/spawn-main';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HomeMain,
      },
      {
        path: '/login',
        component: LoginMain,
      },
      {
        path: '/bazeni/:type',
        component: PoolMain,
        children: [{
          path: ':id',
          component: PoolView,
        }],
      },
      {
        path: '/generacije',
        component: GenerationMain,
      },
      {
        path: '/mrijest',
        component: SpawnMain,
      },
      {
        path: '/mortalitet',
        component: MortalityMain,
      },
      {
        path: '*',
        redirect: { path: '/' },
      },
    ]
  });
}
