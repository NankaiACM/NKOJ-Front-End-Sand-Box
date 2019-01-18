import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';

const ahttp = {
  get(api) {
    return new Promise((resolve, reject) => {
      Axios
        .get(api)
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(api, pkg) {
    return new Promise((resolve, reject) => {
      Axios.post(api, pkg)
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

Vue.use(VueAxios, Axios);
Vue.prototype.$http.aget = ahttp.get;
Vue.prototype.$http.apost = ahttp.post;

export default {
  aget: ahttp.get,
  apost: ahttp.post,
};
