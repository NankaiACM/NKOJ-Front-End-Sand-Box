import Vue from 'vue';
import Router from 'vue-router';

import { objapi } from './fetch/main';
import backCheck from './lib/backcheck';
import frontCheck from './lib/frontcheck';

import home from './view/home.vue';
import register from './view/nkpc/register.vue';
import coding from './view/nkpc/coding.vue';
import activity from './view/nkpc/activity.vue';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: register,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './view/about.vue'),
    },
    {
      path: '/register',
      component: register,
    },
    {
      path: '/coding/:cid/:pid',
      component: coding,
      props: true,
      name: 'coding',
    },
    {
      path: '/coding/:cid',
      component: coding,
      props: true,
    },
    {
      path: '/coding',
      component: coding,
    },
    {
      path: '/activity',
      component: activity,
    },
    {
      path: '*',
      name: 'recycler',
      component: () => import(/* webpackChunkName: "recycler" */ './view/404.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!frontCheck(objapi)) {
    backCheck(objapi, (uData) => {
      router.app.$options.store.commit('userData', uData);
    });
    router.app.$options.store.commit('userCheck', true);
  }
  next();
});

export default router;
