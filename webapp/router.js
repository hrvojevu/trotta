/*
  eslint-disable import/prefer-default-export, import/no-unresolved
*/
import Vue from 'vue';
import Router from 'vue-router';

import Home from '~/pages/home';
import Inspire from '~/pages/inspire';
import Login from '~/pages/login';

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
        path: '/inspire',
        component: Inspire,
      }
    ]
  });
}
