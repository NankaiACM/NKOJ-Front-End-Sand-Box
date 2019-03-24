<template lang="pug">
transition(enter-active-class="animated bounceInLeft",leave-active-class="animated bounceOutRight",@after-leave="closed()")
  #notify.notification.notify(v-if="show")
    button.delete(@click="close()")
    p(v-html="html")
</template>
<script>
export default {
  name: 'notificationUsingBulma',
  props: ['html'],
  methods: {
    close () {
      this.$emit('close');
    },
    closed () {
      this.$emit('closed');
    },
  },
  data () {
    return {
      show: false,
    };
  },
}
</script>
<style lang="scss" scoped>
.notify {
  position: fixed;
  right: 2em;
  bottom: 1em;
}
</style>


