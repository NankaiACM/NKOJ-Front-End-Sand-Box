export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$notify = function Notification(html, e) {
      if (e instanceof Error) {
        window.postMessage({ type: 'notice', payload: { title: `错误：${html}`, content: e.toString(), type: 'warning' } }, '*');
      } else {
        window.postMessage({ type: 'notice', payload: { title: '提示', content: html } }, '*');
      }
    };
  },
};
