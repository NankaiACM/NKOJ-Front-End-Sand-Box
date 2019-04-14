import Vue from 'vue';
import bulma from './bulma/bulma.scss';
import router from './router';
import store from './store';
import './registerServiceWorker';

// import './api/axios';

import message from './component/message/main';
import userCheck from './component/usercheck/usercheck.vue';

import App from './app.vue';

Vue.config.productionTip = false;

Vue.use(bulma);
Vue.use(message);

Vue.component('user-check', userCheck);

// eslint-disable-next-line no-unused-vars
const SAN = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
