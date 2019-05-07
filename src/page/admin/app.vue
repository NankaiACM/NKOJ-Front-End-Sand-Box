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
              | 公告与私信
            a-menu-item(key="sub1_1")
              a-icon(type="user")
              span.nav-text 公告
            a-menu-item(key="sub1_2")
              span.nav-text 发送官方私信
          a-sub-menu(key="sub2")
            span(slot="title")
              a-icon(type="flag")
              | 比赛管理
            a-menu-item(key="2",@click="$router.push({name: '比赛列表'})")
              span.nav-text 比赛列表
          a-sub-menu(key="sub3")
            span(slot="title")
              | 风纪委员会
            a-menu-item(key="sub3_1",@click="() => this.$router.push('/report/list')")
              span.nav-text 举报列表
            a-menu-item(key="sub3_2",@click="$router.push('/report/todo')")
              span.nav-text 未处理
          a-sub-menu(key="sub4")
            span(slot="title")
              | 讨论区管理
            a-menu-item(key="sub4_1",@click="$router.push('/discuss/list')")
              span.nav-text 文章列表
      a-layout(style="padding: 0 24px 24px; overflow: auto;")
        a-breadcrumb(:routes="broutes",style="margin: 16px 0;")
          template(slot="itemRender",slot-scope="{route, params, routes, paths}")
            // slot-scope 是被抛弃的写法
            span(v-if="routes.indexOf(route) === routes.length - 1") {{route.name}}
            router-link(v-else-if="routes.includes(route)",:to="'/' + paths.join('/')") {{route.name}}
        a-layout-content(style="background: white; padding: 24px; overflow: visiable;")
          router-view
        a-layout-footer.n-tcenter NKOJ Admin ©2019 Created by NKOJ Development Department
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted() {
    window.route = this.$route;
    window.router = this.$router;
  },
  data() {
    return {
      broutes: [],
    };
  },
  watch: {
    $route(to) {
      this.broutes = this.$router.options.routes.filter(i => to.fullPath.indexOf(i.path) === 0);
    },
  },
};
</script>

<style lang="scss" scoped>
#admin-layout {
  padding: 0;
  margin: 0;
  width: 100vw;
  // min-height: initial !important;
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
}
</style>
