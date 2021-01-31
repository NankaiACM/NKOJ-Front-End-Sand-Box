import { createRouter, createWebHashHistory } from 'vue-router';
import { apiSelfProfile } from '@/typescript/api';
import store, { SET_USER_CHECK_BOOLEAN, SET_USER_DATA_USERINFORMATION } from './store';
import register from './nkpc/register.vue';
import coding from './nkpc/coding.vue';
import activity from './nkpc/activity.vue';

const router = createRouter({
  history: createWebHashHistory('/nkpc'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: register,
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
      path: '/:catchAll(.*)',
      name: 'recycler',
      component: () => import(/* webpackChunkName: "recycler" */ '@/views/nkpc/nkpc/404.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.user.check) {
    try {
      const selfProfile = await apiSelfProfile(); // 检查是不是已经持有登录凭据
      store.commit(SET_USER_DATA_USERINFORMATION, selfProfile); // 更新当前用户信息
      store.commit(SET_USER_CHECK_BOOLEAN, true); // 更新用户校验状态
    } catch (e) {
      console.log('未登录, 强制进行路径导航');
    }
  }
  next();
});

export default router;
