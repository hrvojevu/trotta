/*
  eslint-disable import/prefer-default-export
*/

import Vue from 'vue';
import Router from 'vue-router';

import Home from '~/home';
import Inspire from '~/inspire';
import Login from '~/auth/login';

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
