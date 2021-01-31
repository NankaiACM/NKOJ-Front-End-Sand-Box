<template lang="pug">
section#app.hero.is-fullheight(style="filter:blur(0)")
  .hero-head
    header.has-background-light.navbar
      .container
        .navbar-menu
          a.navbar-item.has-text-black(href="//acm.nankai.edu.cn") 主站
          router-link.navbar-item.has-text-black(to="/coding/1022/") coding
  .hero-body(style="background:rgba(255,255,255,.82);")
    router-view
  message
</template>

<script>
import message from '@/components/message/index.vue';

export default {
  name: 'app',
  components: {
    message,
  },
};
</script>
