import { createStore } from 'vuex';
import { logStore } from '@/components/log/log';

export const SET_USER_CHECK_BOOLEAN = 'SET_USER_CHECK_BOOLEAN';
export const SET_USER_DATA_USERINFORMATION = 'SET_USER_DATA_USERINFORMATION';

export default createStore({
  state: {
    user: {
      check: false, // 当用户校验状态为 false 时要求进行登录
      data: {},
    },
  },
  mutations: {
    // eslint-disable-next-line
    [SET_USER_CHECK_BOOLEAN](state: any, payload: boolean) {
      state.user.check = payload;
    },
    // eslint-disable-next-line
    [SET_USER_DATA_USERINFORMATION](state: any, payload: UserInformationReturnInterface) {
      state.user.data = payload;
    },
  },
  modules: {
    logModule: logStore,
  },
});
