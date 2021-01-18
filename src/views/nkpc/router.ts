import { createRouter, createWebHistory } from 'vue-router';

// import { objapi } from '@/fetch/main.ts';
// import backCheck from '@/lib/backcheck';
// import frontCheck from '@/lib/frontcheck';

// import home from './view/home.vue';
import register from './nkpc/register.vue';
import coding from './nkpc/coding.vue';
import activity from './nkpc/activity.vue';

// Vue.use(Router);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
    // { // webpackChunk示例
    //   path: '*',
    //   name: 'recycler',
    //   component: () => import(/* webpackChunkName: "recycler" */ '@/view/404.vue'),
    // },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (!frontCheck(objapi)) {
//     backCheck(objapi, (uData) => {
//       router.app.$options.store.commit('userData', uData);
//     });
//     router.app.$options.store.commit('userCheck', true);
//   }
//   next();
// });

export default router;