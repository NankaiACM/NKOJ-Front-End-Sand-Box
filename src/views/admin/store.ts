import { createStore } from 'vuex';

export const SET_USER_CHECK_BOOLEAN = 'SET_USER_CHECK_BOOLEAN';
export const SET_USER_DATA_USERINFORMATION = 'SET_USER_DATA_USERINFORMATION';

export default createStore({
  state: {
    user: {
      check: false, // 当用户校验状态为 false 时要求进行登录
      data: {}, // 用户详细信息
    },
  },
  mutations: {
    [SET_USER_CHECK_BOOLEAN](state, payload: boolean) {
      state.user.check = payload;
    },
    [SET_USER_DATA_USERINFORMATION](state, payload: UserInformationReturnInterface) {
      state.user.data = payload;
    },
  },
});
