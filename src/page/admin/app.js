import Vue from 'vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


import app from './app.vue';

Vue.config.productionTip = false;

// eslint-disable-next-line no-unused-vars
const SAN = new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store,
});
