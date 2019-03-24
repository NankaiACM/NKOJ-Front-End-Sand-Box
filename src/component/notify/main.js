import notify from './notify.vue';

export default {
  install(Vue) {
    Vue.component(notify.name, notify);
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$notify = function Notification(html, e) {
      const Notify = Vue.extend(notify);
      if (e && e.code === 422) {
        let msg = '<div class="has-text-danger">';
        msg = `${msg + html}<br>`;
        msg = `${msg}message: ${e.message}<br>`;
        for (const i of e.error) {
          msg = `${msg}${i.name}: ${i.message}` + '<br>';
        }
        msg += '</div>';
        html = msg;
      }
      const instance = new Notify({
        propsData: {
          html,
        },
      });
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.show = true;
      instance.$on('close', () => {
        // instance.vm.$el.style.display = 'none';
        instance.vm.show = false;
      });
      instance.$on('closed', () => {
        document.body.removeChild(instance.vm.$el);
        instance.vm.$destroy();
      });
    };
  },
};
