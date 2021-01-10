<template lang="pug">
div
  nav.navbar.is-transparent.is-fixed-top
    .navbar-brand
      a.navbar-item 这里是logo
    .navbar-burger.burger
    .navbar-menu
      .navbar-start
        a.navbar-item 主页
        a.navbar-item 题库
        a.navbar-item 评测
        a.navbar-item 比赛
        a.navbar-item 视频
        .navbar-item.has-dropmenu.is-hoverable
          a.navbar-link
          .navbar-dropdown
            a.navbar-item 个人中心
            a.navbar-item 管理中心
            a.navbar-item 注销
            hr.navbar-divider
            .navbar-item 上次登录：
            .navbar-item 版本：
      .navbar-end
        .navbar-item
          .field.is-grouped
            .control
              a.button.is-primary
                span.icon
                  i.fab.fa-twitter
                span sign in
            .control
              a.button.bd-tw-button
                span.icon
                  i.fab
                span sign up
  section#app.hero.is-fullheight(style="filter:blur(0)")
    .hero-head
      header.navbar.has-background-light
        .container
          .navbar-menu
            router-link.navbar-item.has-text-black(to="/register") register
            router-link.navbar-item.has-text-black(to="/coding/1022/") coding
    .hero-body(style="background:rgba(255,255,255,.82);")
      router-view
    message
</template>

<script>
/* eslint-disable-next-line */
// import message from '@/component/message/index.vue';

export default {
  name: 'app',
  components: {
    // message,
  },
};
</script>
