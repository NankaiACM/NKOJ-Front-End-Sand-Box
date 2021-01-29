<template lang="pug">
a-layout#admin-layout
  a-layout-header.header.n-nopadding
    .logobox
      img.nkojadmin(:src="`${publicPath}img/admin-logo.png`")
    a-menu.n-line64(
      theme="dark",
      mode="horizontal",
      :defaultSelectedKeys="['h1']"
    )
      a-menu-item(key="h1", @click="$router.push('/')") 控制台
      a-menu-item(key="h2", @click="$router.push({ name: '登录'})")
        template(v-if="!userCheck") 登录
        template(v-else)
          a-avatar(:src="userAvatarSrc") 用户信息
      a-menu-item(key="h3", @click="showDrawer = !showDrawer") 调试信息
  a-layout
    a-layout-sider.fixed-sider
      a-menu(
        theme="dark",
        mode="inline",
        :defaultSelectedKeys="defaultKey()",
        :defaultOpenKeys="defaultOpen()"
      )
        a-sub-menu(key="/message")
          template(#title)
            UserOutlined
            | 公告与私信
          a-menu-item(
            key="/message/announce",
            @click="$router.push('/message/announce')"
          )
            span.nav-text 官方公告
          a-menu-item(
            key="/message/whisper",
            @click="$router.push('/message/whisper')"
          )
            span.nav-text 官方私信
          a-menu-item(
            key="/message/report",
            @click="$router.push('/message/report')"
          )
            span.nav-text 私信举报
        a-sub-menu(key="/contest")
          template(#title)
            FlagOutlined
            | 比赛管理
          a-menu-item(
            key="/contest/list",
            @click="$router.push({ name: '比赛列表' })"
          )
            span.nav-text 比赛列表
          a-menu-item(
            key="/contest/append'",
            @click="$router.push('/contest/append')"
          )
            span.nav-text 添加比赛
        a-sub-menu(key="sub4")
          template(#title)
            CommentOutlined
            | 讨论区管理
          a-menu-item(
            key="/discuss/list",
            @click="$router.push('/discuss/list')"
          )
            span.nav-text 文章列表
        a-sub-menu(key="/problem")
          template(#title)
            ClusterOutlined
            | 题目管理
          a-menu-item(
            key="/problem/list",
            @click="$router.push('/problem/list')"
          )
            span.nav-text 题目列表
          a-menu-item(
            key="/problem/append",
            @click="$router.push('/problem/append')"
          )
            span.nav-text 添加题目
        a-sub-menu(key="/judge")
          template(#title)
            CodeOutlined
            | 评测管理
          a-menu-item(key="/judge/list", @click="$router.push('/judge/list')")
            span.nav-text 评测列表
    a-layout(style="padding: 0 24px 24px; overflow: auto")
      a-breadcrumb(:routes="broutes", style="margin: 16px 0")
        template(#itemRender="{route, params, routes, paths}")
          span(v-if="broutes && broutes.indexOf(route) === broutes.length - 1") {{ route.name }}
          router-link(
            v-else-if="broutes && broutes.includes(route)",
            :to="'/' + paths.join('/')"
          ) {{ route.name }}
      a-layout-content(
        style="background: white; padding: 24px; overflow: visiable"
      )
        router-view
      a-layout-footer.n-tcenter NKOJ Admin ©2019 Created by NKOJ Development Department
  a-drawer(title="消息通知", v-model:visible="showDrawer", width="700")
    a-space(direction="vertical")
      a-card(v-for="(item, index) in logs", hoverable)
        vnode(:vnode="item")
</template>

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

<script>
import { Vue, Options } from 'vue-class-component';
import { h } from 'vue';
import {
  UserOutlined, FlagOutlined, CommentOutlined, ClusterOutlined, CodeOutlined,
} from '@ant-design/icons-vue';
import { getAvatarImageSrc } from '@/typescript/objFormatUrl';
import store from './store';

// import message from '@/component/message/index.vue';

@Options({
  name: 'app',
  components: {
    UserOutlined,
    FlagOutlined,
    CommentOutlined,
    ClusterOutlined,
    CodeOutlined,
    Vnode: {
      functional: true,
      render() {
        return h(this.vnode);
      },
      props: {
        vnode: {
          type: Object,
          required: true,
        },
      },
    },
  },
  watch: {
    $route(to) {
      if (!to.fullPath) { return; }
      this.broutes = this.$router.options.routes.filter((i) => to.fullPath.indexOf(i.path) === 0);
    },
  },
  computed: {
    publicPath() {
      return process.env.BASE_URL;
    },
    logs() {
      return store.state.logModule.logs;
    },
    userCheck() {
      return store.state.user.check;
    },
    userAvatarSrc() {
      return getAvatarImageSrc(store.state.user.data.user_id);
    },
  },
})
export default class App extends Vue {
  broutes = [];

  showDrawer = false;

  mounted() {
    window.route = this.$route;
    window.router = this.$router;
  }

  defaultKey() {
    let ret = '';
    // eslint-disable-next-line
    for (const i of this.$router.options.routes) {
      if (window.location.href.indexOf(i.path) !== -1) {
        ret = i.path;
      }
    }
    return [ret];
  }

  defaultOpen() {
    const [ret] = this.defaultKey();
    return [`/${ret.split('/')[1]}`];
  }
}
</script>
