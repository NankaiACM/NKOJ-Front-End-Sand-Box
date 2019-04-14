import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      check: false,
      data: {},
    },
  },
  mutations: {
    userCheck(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.user.check = payload;
    },
    userData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.user.data = payload;
    },
  },
  actions: {

  },
});
