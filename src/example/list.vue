<template lang="pug">
  div
    // a-affix(:offsetTop="16" :target="() => this.$parent.$parent.$parent.$el") // 这是非常糟糕的设计
    a-anchor.n-affix
      a-anchor-link(:href="'#' + item['contest_id']",:title="item.title + JSON.parse(item.during).join(' to ')",v-for="item, index in data",:key="'link' + index")
    a-list(itemLayout="horizontal",:dataSource="data")
      a-list-item(slot="renderItem",slot-scope="item, index")
        a(slot="actions") 编辑
        a-list-item-meta(:description="JSON.parse(item.during).join('\\n至\\n')")
          a(slot="title",href="") {{item.title}}
          a-avatar(slot="avatar",src="/avatar.jpg")
        div {{ item.description.substr(0,141) }} {{item.description.length > 141 ? '...' : ''}}
</template>
<script>
export default {
  data() {
    return {
      data: [],
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = await this.$http.api('contestlist');
      this.data = this.data.list;
      this.loading = false;
    });
  },
};
</script>
<style lang="scss" scoped>
.ant-list-item-meta-description {
  white-space: pre-wrap;
}
.n-affix {
  padding: 1em;
  margin: 1em 0;
}
</style>
