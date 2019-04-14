import Vue from 'vue';
import Router from 'vue-router';

import { objapi } from '@/fetch/main';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
  ],
});

export default router;
