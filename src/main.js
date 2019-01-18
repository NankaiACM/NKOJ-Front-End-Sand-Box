import Vue from 'vue';
import animate from 'animate.css';
import bulma from './bulma/bulma.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './api/axios';

Vue.config.productionTip = false;

Vue.use(animate);
Vue.use(bulma);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
