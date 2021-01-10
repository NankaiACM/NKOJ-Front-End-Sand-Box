import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './app.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'ant-design-vue/dist/antd.css';
import './app.scss';

const app = createApp(App);
app.use(store).use(router).use(Antd).mount('#app');
