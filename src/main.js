import Vue from 'vue';
import bulma from './bulma/bulma.scss';
import router from './router';
import store from './store';
import './registerServiceWorker';

// import './api/axios';

import notify from './component/notify/main';
import userCheck from './component/usercheck.vue';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(bulma);
Vue.use(notify);

Vue.component('user-check', userCheck);

// eslint-disable-next-line no-unused-vars
const SAN = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  data: {
    messageID: 0,
    messages: [],
  },
  mounted() {
    window.addEventListener('message', (e) => {
      const { data } = e;
      switch (data.type) {
        case 'notice':
          this.pushMessage(data.payload);
          break;
        case 'event':
          break;
        case 'login':
          break;
        default:
          break;
      }
    });
  },
  methods: {
    pushMessage({ title, content, type }) {
      this.messages.push({
        id: this.messageID += 1,
        title,
        content,
        type,
      });
    },
    deleteMessage(id) {
      for (let i = 0; i < this.messages.length; i += 1) {
        if (this.messages[i].id === id) {
          this.messages.splice(i, 1);
          return;
        }
      }
    },
  },
});
