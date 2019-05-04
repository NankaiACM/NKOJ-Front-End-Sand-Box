import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{ // 注意：列出route的顺序应该是父路径在前，这关系到面包屑导航的索引顺序
    path: '/',
    redirect: '/contest/list',
    name: '首页',
  }, {
    path: '/contest',
    name: '比赛管理',
    redirect: '/contest/list',
  }, {
    path: '/contest/list',
    name: '比赛列表',
    component: () => import(/* webpackChunkName: "_contest_list" */ './contest/list'),
  },
  ],
});

export default router;
