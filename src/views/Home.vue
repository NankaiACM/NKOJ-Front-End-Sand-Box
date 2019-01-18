<template lang="pug">
  transition(name="homeanimate", enter-active-class="animated tada", leave-active-class="animated bounceOutRight")
    div.notification
      button.delete
      .home(ref="home")
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  async mounted() {
    const msg = await this.$http.aget('http://acm.nankai.edu.cn/api/contest/1001');
    this.$refs.home.innerHTML = JSON.stringify(msg.data);
  },
};
</script>
