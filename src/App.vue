<template lang="pug">
  section#app.hero.is-fullheight(style="filter:blur(0)")
    .hero-head
      header.navbar.has-background-light
        .container
          .navbar-menu
            router-link.navbar-item.has-text-black(to="/register") register
            router-link.navbar-item.has-text-black(to="/coding/1001/") coding
            router-link.navbar-item.has-text-black(to="/custom") custom
    .hero-body(style="background:rgba(255,255,255,.82);")
      router-view#main
    Message
</template>

<script>
import Message from './component/Message/index.vue';

export default {
  name: 'app',
  components: {
    Message,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
