<template lang="pug">
  div
    a-textarea.n-margin(placeholder="编辑公告内容",rows="4")
    a-row(type="flex",justify="end")
      a-button(type="primary") 发送公告
    a-list.n-margin(itemLayout="vertical",:dataSource="data",bordered)
      a-list-item(slot="renderItem",slot-scope="item, index",key="message_id")
        a-button(slot="actions") 撤回
        a-list-item-meta(:description="new Date(item.since).toLocaleString()")
          span(slot="title") {{ item.title }}
          a-avatar(slot="avatar",size="large") {{ item['message_id'] }}
        p {{ item.content }}
</template>
<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = await this.$http.api('announce');
    });
  },
};
</script>
