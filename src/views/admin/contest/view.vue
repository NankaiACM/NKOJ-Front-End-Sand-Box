<template lang="pug">
a-card(:title="contestDetail.title", hoverable, :loading="loading")
  template(#extra)
    a-tag(color="pink")  contest_id: {{ contestDetail['contest_id'] }}
    a-divider(type="vertical")
    a(:href="nkpcUrl") 前往
    a-divider(type="vertical")
    router-link(:to="{ name: '编辑比赛', props: { contestId: contestDetail['contest_id'] }}") 编辑
  a-space(direction="vertical", style="width: 100%;")
    a-card(title="比赛时间", hoverable)
      a-timeline
        a-timeline-item(color="green") start {{ JSON.parse(contestDetail.during)[0] }}
        a-timeline-item(color="blue") end {{ JSON.parse(contestDetail.during)[1] }}
    a-card(title="比赛描述", hoverable)
      a-tabs
        a-tab-pane(tab="原始数据", key="1")
          pre {{ contestDetail.description }}
        a-tab-pane(tab="预览", key="2")
          div(v-html="descriptionRender")
    a-card(title="附加文件", hoverable, v-if="contestDetail.file")
      a-tabs
        a-tab-pane(tab="原始数据", key="1")
          pre {{ contestDetail.file }}
        a-tab-pane(tab="预览", key="2")
          div(v-html="fileRender")
    a-card(title="Extra", hoverable)
      a-switch(disabled, :checked="contestDetail.extra")
    a-card(title="私密模式", hoverable)
      a-switch(disabled, :checked="contestDetail.private")
    a-card(title="perm 魔法数字", hoverable)
      a-checkbox(:checked="it === '1'", v-for="it, ix in contestDetail.perm.replace('(','').replace(')','').split(',')", :key="'check' + ix", disabled)
    a-card(title="赛制", hoverable)
      a-tag(color="blue") {{ contestDetail.rule}}
    a-card(:title="'题目列表' + (contestDetail.problems ? (contestDetail.problems.length === 0 ? '为空' : '') : '为空')", hoverable)
      a-card-grid(style="width:25%;text-align:center;", v-for="it,ix in contestDetail.problems", :key="'problem' + ix")
        a(:href="getProblemHref(it.problem_id)", target="_blank") {{ it.problem_id }}
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import { Vue, prop, Options } from 'vue-class-component';
import { apiContestDetail } from '@/typescript/api';
import { getNKPCUrl, getProblemUrl } from '@/typescript/objFormatUrl';
import markdownIt from '@/typescript/markdown';

class Props {
  contestId = prop({
    type: Number,
    required: true,
  });
}

@Options({
  computed: {
    nkpcUrl() {
      return getNKPCUrl(this.contestId);
    },
    descriptionRender() {
      return markdownIt.render(this.contestDetail.description || '');
    },
    fileRender() {
      return markdownIt.render(this.contestDetail.file || '');
    },
  },
})
export default class extends Vue.with(Props) {
  loading = true;

  contestDetail = {} as ContestDetailReturnInterface;

  mounted() {
    this.$nextTick(async () => {
      await this.loadData();
    });
  }

  async loadData() {
    this.loading = true;
    try {
      this.contestDetail = await apiContestDetail(this.contestId);
    } catch (e) {
      // do nothing
    }
    this.loading = false;
  }

  // eslint-disable-next-line class-methods-use-this
  getProblemHref(contestId: number) {
    return getProblemUrl(contestId);
  }
}
</script>
