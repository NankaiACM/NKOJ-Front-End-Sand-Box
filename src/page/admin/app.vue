<template lang="pug">
  a-layout#admin-layout
    a-layout-header.header.n-nopadding
      .logobox
        img.nkojadmin(src="/admin-logo.png")
      a-menu.n-line64(theme="dark",mode="horizontal",:defaultSelectedKeys="['h1']")
        a-menu-item(key="h1") 控制台
    a-layout
      a-layout-sider.fixed-sider
        a-menu(theme="dark",mode="inline",:defaultSelectedKeys="['2']",:defaultOpenKeys="['sub2']")
          a-sub-menu(key="sub1")
            span(slot="title")
              a-icon(type="user")
              | 用户管理
            a-menu-item(key="1")
              a-icon(type="user")
              span.nav-text ???
          a-sub-menu(key="sub2")
            span(slot="title")
              a-icon(type="flag")
              | 比赛管理
            a-menu-item(key="2")
              span.nav-text 比赛列表
      a-layout(style="padding: 0 24px 24px; height: 100vh; overflow: auto;")
        a-breadcrumb(:routes="$router.options.routes",style="margin: 16px 0;")
          template(slot="itemRender",slot-scope="{route, params, routes, paths}")
            // slot-scope 是被抛弃的写法
            span(v-if="routes.indexOf(route) === routes.length - 1") {{route.name}}
            router-link(v-else,:to="'/' + paths.join('/')") {{route.name}}
        a-layout-content(style="background: white; padding: 24px; overflow: visiable;")
          router-view
        a-layout-footer NKOJ Admin ©2019 Created by NKOJ Development Department
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted() {
    console.log(this.$route);
    console.log(this.$router);
  },
};
</script>

<style lang="scss" scoped>
#admin-layout {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  .header {
    .logobox {
      height: 64px;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      .nkojadmin {
        width: 150px;
        vertical-align: middle;
        object-fit: cover;
      }
    }
  }
  .ant-layout-content {
    min-height: initial !important;
  }
}
.fixed-sider {
  overflow: auto;
  height: 100vh;
}
</style>
