import { createApp } from 'vue';
import '@/scss/bulma.scss';
// import message from '@/component/message/main';
// import userCheck from '@/component/usercheck/usercheck.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import App from './app.vue';

// Vue.use(message);

// Vue.component('user-check', userCheck);

createApp(App).use(store).use(router).mount('#app');
