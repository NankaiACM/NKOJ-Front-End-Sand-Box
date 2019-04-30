import Vue from 'vue';
import Antd from 'ant-design-vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './antd.less';

import app from './app.vue';

Vue.config.productionTip = false;

Vue.use(Antd);

// eslint-disable-next-line no-unused-vars
const SAN = new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store,
});
