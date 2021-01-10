import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      check: false,
      data: {},
    },
  },
  mutations: {
    userCheck(state, payload) {
      state.user.check = payload;
    },
    userData(state, payload) {
      state.user.data = payload;
    },
  },
  actions: {

  },
});
