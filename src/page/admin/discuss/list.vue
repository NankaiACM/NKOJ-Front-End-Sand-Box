<template lang="pug">
  div
    a-modal(title="程序需要更新",:visible="needupdata",@ok="needupdata = !needupdata")
      p 数据量已经超出初期设计，请更新前端程序
    a-list(:loading="loading",:dataSource="data.list",itemLayout="vertical",:grid="{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl:2}")
      a-list-item(slot="renderItem",slot-scope="item, index")
        a-card
          a-card-meta(:title="item.title")
            a-avatar(slot="avatar",:src="'http://acm.nankai.edu.cn/api/avatar/' + item.nickname")
          br
          pre.
            文章编号：{{ item.post_id }}
            发布者编号：{{ item.user_id }}
            发布者昵称：{{ item.nickname }}
            发布时间：{{ new Date(item.since).toLocaleString() }}
            最后活跃用户：{{ item.last_active_user }}
            最后活跃时间：{{ item.last_active_date }}
            支持数：{{ item.positive }}
            反对数：{{ item.negative }}
          a(slot="actions") 掩藏文章
          a(slot="actions") 恢复文章
          a(slot="actions") 显示全文
</template>
<script>
export default {
  data() {
    return {
      data: [],
      needupdata: false,
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = await this.$http.api('discuss0');
      this.loading = false;
      console.log(this.data);
      if (this.data.is_end !== true) {
        this.needupdata = true;
      }
    });
  },
};
</script>
