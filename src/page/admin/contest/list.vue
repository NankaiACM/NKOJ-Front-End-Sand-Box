<template lang="pug">
  div
    //- a-affix(:offsetTop="16" :target="() => this.$parent.$parent.$parent.$el") // 这是非常糟糕的设计
    //- a-spin(tip="loading...",:spinning="loading")
    //-   div.n-margin
    a-card(title="目录",:loading="loading")
      a-anchor.n-affix()
        a-anchor-link(:href="'#' + item['contest_id']",:title="item.title + JSON.parse(item.during).join(' to ')",v-for="item, index in data",:key="'link' + index")
    a-card(v-for="item,index in data",:title="item.title",hoverable,:key="'card' + index",:loading="loading",:id="item['contest_id']").n-margin
      a(href="#",slot="extra")
        a-tag(color="pink")  {{ item['contest_id'] }}
        a-divider(type="vertical")
        | 编辑
      a-card(title="perm 魔法数字").n-margin
        a-checkbox(:checked="it === '1'",v-for="it,ix in item.perm.replace('(','').replace(')','').split(',')",:key="'check' + ix",disabled)
      a-card(title="公开设置").n-margin
        a-switch(disabled,:checked="item.private")
      a-card(:title="'题目列表' + (item.problems.length === 0 ? '为空' : '')").n-margin
        a-card-grid(style="width:25%;text-align:center;",v-for="it,ix in item.problems",:key="'problem' + ix") {{ it.pid }}
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
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async function () {
      this.data = await this.$http.api('contestlist');
      this.data = this.data.list;
      this.loading = false;
      console.log(this.$parent.$parent.$parent.$el);
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
