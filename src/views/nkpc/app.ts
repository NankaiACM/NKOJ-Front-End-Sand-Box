import { createApp } from 'vue';
import bulma from '@/scss/bulma.scss';
import message from '@/components/message/main';
import { USER_DEBUG_LOG_CONFIG } from '@/components/log/log';
import router from './router';
import store from './store';
import './registerServiceWorker';
import App from './app.vue';
import userCheck from './nkpc/usercheck.vue';

USER_DEBUG_LOG_CONFIG.ENABLE_LOG_STORE = false;
USER_DEBUG_LOG_CONFIG.ENABLE_UI_NOTIFICATION = false;

createApp(App)
  .use(store)
  .use(router)
  .use(bulma)
  .use(message)
  .component('user-check', userCheck)
  .mount('#app');
