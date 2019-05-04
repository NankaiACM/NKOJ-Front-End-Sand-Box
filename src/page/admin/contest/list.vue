<template lang="pug">
  div
    // a-affix(:offsetTop="16" :target="() => this.$parent.$parent.$parent.$el") // 这是非常糟糕的设计
    a-anchor.n-affix
      a-anchor-link(:href="'#' + item['contest_id']",:title="item.title + JSON.parse(item.during).join(' to ')",v-for="item in data")
    a-list(itemLayout="horizontal",:dataSource="data")
      a-list-item(slot="renderItem",slot-scope="item, index")
        a(slot="actions") 编辑
        a-list-item-meta(:description="JSON.parse(item.during).join('\\n至\\n')")
          a(slot="title",href="") {{item.title}}
          a-avatar(slot="avatar",src="/avatar.jpg")
        div {{ item.description.substr(0,141) }} {{item.description.length > 141 ? '...' : ''}}
    a-card(v-for="item,index in data",:title="item.title",hoverable,:id="item['contest_id']").n-margin
      a(href="#",slot="extra") 编辑
      p
        a-tag(color="pink") cid: {{ item['contest_id'] }}
      p perm 魔法数字:
        a-checkbox(:checked="it === '1'",v-for="it,ix in item.perm.replace('(','').replace(')','').split(',')",disabled)
      p 公开设置:
        a-switch(disabled,:checked="item.private")
      a-card(:title="'题目列表' + (item.problems.length === 0 ? '为空' : '')").n-margin
        a-card-grid(style="width:25%;text-align:center;",v-for="it,ix in item.problems") {{ it.pid }}
      a-card(title="比赛描述",hoverable).n-margin {{ item.description }}
      a-card(title="比赛时间",hoverable).n-margin
        a-timeline
          a-timeline-item(color="green") start {{ JSON.parse(item.during)[0] }}
          a-timeline-item(color="blue") end {{ JSON.parse(item.during)[1] }}
</template>
<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.$nextTick(async function () {
      this.data = await this.$http.api('contestlist');
      this.data = this.data.list;
      console.log(this.data);
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
.n-margin {
  margin: 2em 0;
}
</style>
