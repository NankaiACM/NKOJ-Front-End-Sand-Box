<template lang="pug">
  section#app.hero.is-fullheight(style="filter:blur(0)")
    .hero-head
      header.navbar.has-background-light
        .container
          .navbar-menu
            // router-link.navbar-item.has-text-black(to="/register") register
            router-link.navbar-item.has-text-black(to="/coding/1022/") coding
    .hero-body(style="background:rgba(255,255,255,.82);")
      router-view
    message
</template>

<script>
import message from '@/component/message/index.vue';

export default {
  name: 'app',
  components: {
    message,
  },
};
</script>
