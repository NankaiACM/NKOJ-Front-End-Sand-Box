import Vue from 'vue';
import bulma from './bulma/bulma.scss';
import main from './main.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// import './api/axios';

import notify from './component/notify/main';
import userCheck from './component/usercheck.vue';

Vue.config.productionTip = false;

Vue.use(bulma);
Vue.use(notify);

Vue.component('user-check', userCheck);

new Vue({
  router,
  store,
  render: h => h(main),
}).$mount('#main');
