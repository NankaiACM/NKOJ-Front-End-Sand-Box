import { h, VNode } from 'vue';
import { createStore } from 'vuex';
import { notification } from 'ant-design-vue';
import 'ant-design-vue/lib/button/style/css';
import notifyContent from './notifyContent.vue';

export const PUSH_USER_DEBUG_LOG = 'PUSH_USER_DEBUG_LOG';

export enum USER_DEBUG_LOG_TYPE {
  SUCCESS,
  FAILURE,
}

export const USER_DEBUG_LOG_CONFIG = {
  ENABLE_CONSOLE_LOG_USER_MESSAGE: true,
  ENABLE_CONSOLE_LOG_DEBUG_MESSAGE: true,
  ENABLE_LOG_STORE: true,
  ENABLE_UI_NOTIFICATION: true,
};

export const logStore = createStore({
  state: {
    logs: [] as Array<VNode>,
  },
  mutations: {
    [PUSH_USER_DEBUG_LOG](state, payload: VNode) {
      state.logs.push(payload);
    },
  },
});

export function USER_DEBUG_LOG(userMessage: string, debugMessage?: object, type?: USER_DEBUG_LOG_TYPE) {
  if (USER_DEBUG_LOG_CONFIG.ENABLE_CONSOLE_LOG_USER_MESSAGE) { console.log(userMessage); }
  if (USER_DEBUG_LOG_CONFIG.ENABLE_CONSOLE_LOG_DEBUG_MESSAGE && debugMessage) {
    if (type === USER_DEBUG_LOG_TYPE.FAILURE) {
      console.log(debugMessage);
    }
  } else {
    debugMessage = {};
  }
  const vNode = h(notifyContent, { userMessage, debugMessage: JSON.stringify(debugMessage, null, 2) });
  if (USER_DEBUG_LOG_CONFIG.ENABLE_LOG_STORE) { logStore.commit(PUSH_USER_DEBUG_LOG, vNode); }
  if (USER_DEBUG_LOG_CONFIG.ENABLE_UI_NOTIFICATION) {
    if (type === USER_DEBUG_LOG_TYPE.SUCCESS) {
      notification.success({ message: 'SUCCESS', description: vNode, duration: 1 });
    } else if (type === USER_DEBUG_LOG_TYPE.FAILURE) {
      notification.error({ message: 'FAILURE', description: vNode, duration: null });
    }
  }
}
