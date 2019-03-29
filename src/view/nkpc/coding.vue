<template lang="pug">
  #coding.container.is-fullhd
    .box
      user-check(ref="usercheck")
        template(v-slot:userok)
          .level
            .level-left 检查用户状态成功。
            .level-right.a.button.is-primary.is-right(@click="$refs.usercheck.close()") 关闭
      article.media
        .media-left
          figure.img.is-64o64
            img(:src="waifu")
        .media-content
          .content
            strong {{annouce.title}}
            small {{annouce.since}}
            p {{annouce.content}}
    article.message(:class="submitted.length === 0 ? 'is-warning' : 'is-success'")
      .message-body 您已提交：
        span.submitted(v-if="submitted.length === 0") 暂无
        span.submitted(v-for="p in submitted" :key="p") {{p}}
    .field.is-grouped
      .control
        .select
          select(v-model="mypid")
            option(v-for="(it,index,key) in contest.problems",:value="it['problem_id']",:key="index") [{{ getIndex(index) }}] {{key}} {{it['problem_id']}} : {{it.title}}
      .control
        .select
          select(v-model="lang")
            option(v-for="(it,index,key) in langMap",:value="it.value") {{it.lang}}
      .control
        button.button.is-primary(@click="codeok = !codeok") {{ codeok ? '关闭' : '我要提交'}}
      transition(enter-active-class="animated bounceInRight",leave-active-class="animated bounceOutRight")
        .control(v-if="codeok")
          button.button.is-warning(@click="submit()") 提交
    transition(enter-active-class="animated bounceInUp",leave-active-class="animated bounceOutDown")
      .field(v-if="codeok")
        .control
          textarea.textarea.is-primary#code(v-model="code")
    .content#markdown-here(v-html="markdown")
</template>
<script>
import { langMap } from '@/map/lang.js';
import markdownIt from 'markdown-it';
import markdownItMathjax from 'markdown-it-mathjax';
import markdownItLatex from 'markdown-it-latex';
import 'markdown-it-latex/dist/index.css';

import pidorders from '../../map/pidorder.js';

const markdownit = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
markdownit.use(markdownItMathjax);
markdownit.use(markdownItLatex);

export default {
  name: 'nkpccodingpage',
  props: ['cid', 'pid'],
  data() {
    return {
      annouce: {
        title: '通告获取中...',
        content: '电波传送中...',
        since: '正在正则化时间向量...',
      },
      contest: {},
      markdown: '',
      problem: {},
      submitted: [],
      codeok: false,
      code: '',
      lang: 1,
      waifu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAM1BMVEXMzMzKysqWlpbExMS7u7vHx8eysrKampqdnZ2ZmZnCwsKoqKi2trakpKShoaG+vr6srKxM8yeWAAAA/UlEQVR42u3Su46FMAxFUdvkDQH+/2vHIcVcUYw0RYor7VVwTFzYgggAAAAAAAAAAAAA4L90PqPnm84zby1RbRPRbl09ihV9tSTVcnncVj0WiGNKyLEEj7pZeLXUwr0/0T0W0DHlOOVMIqFIDn7UpOlsjS1iOkfd7oULqKpdIltNNYq0nPL20dpvf+l7OWSFMcUdWb3utXtIsvTRinY9Z7nJCnOKljEyZC1hfIEjt98F0vnU17pfMEfLvAqHZ5T4sVsNMq9ClxXmjy5JVeTKW27v3dKp6lHCfssCc0ows8Pr3XZ971bN+nNJzibr6V8tAAAAAAAAAAAAAMBX+QEytwU/4NOHhQAAAABJRU5ErkJggg==',
      mypid: this.pid,
    };
  },
  methods: {
    getIndex (i) {
      return String.fromCharCode(65 + i)
    },
    thisWaifuDoseNotExist() {
      return this.waifu = `//www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 1e5)}.jpg`;
    },
    async thisAnnouceExist() {
      try {
        const res = await this.$http.api('announce');
        if (res[0]) {
          this.annouce = res[0];
        }
      } catch (e) {
        this.$notify(`获取通告失败：${e.toString()}`);
      }
    },
    async thisContestExist() {
      try {
        const res = await this.$http.api('contest', { cid: this.cid });
        this.contest = res;
        if (pidorders[this.cid]) {
          let mp = pidorders[this.cid]
          this.contest.problems = this.contest.problems.sort((a, b) => {
            return (mp[a['problem_id']].charCodeAt() || 0) - (mp[b['problem_id']].charCodeAt() || 0)
          });
        }
        if (!this.pid) {
          this.$router.push({ name: 'coding', params: { cid: this.cid, pid: res.problems[0].problem_id } });
        }
        const submitted = await this.$http.api('submitted', {cid: this.cid})
        this.submitted = submitted;
      } catch (e) {
        this.$notify(`获取比赛信息失败：${e.toString()}`);
      }
    },
    thisMarkMathjaxLatexExist(obj) {
      let markdown = '';
      for (const i in obj) {
        markdown += `### ${i.replace(/\b\w/g, l => l.toUpperCase())}\n${obj[i]}\n`;
      }
      return markdownit.render(markdown);
    },
    async submit() {
      if (!this.codeok) return;
      try {
        const res = await this.$http.objpost('judge', '', {
          pid: this.pid * 1,
          lang: this.lang * 1,
          code: this.code,
        });
        this.$notify('提交成功');
        codeok = false;
      } catch (e) {
        this.$notify('提交失败', e);
      }
    },
    thisUrlDoseNotExist() {
      if (!this.cid) {
        this.$router.push({ name: 'coding', params: { cid: 1001 } });
      }
    },
    async thisProblemExist() {
      if (this.mypid !== this.pid) this.mypid = this.pid;
      try {
        if (!this.pid) throw new Error('无法获取题目id');
        this.problem = await this.$http.api('problem', { pid: this.pid });
        this.markdown = this.thisMarkMathjaxLatexExist(this.problem.content);
      } catch (e) {
        this.$notify(`获取题目失败：${e.toString()}`);
      }
    },
    thisCodingPageDoseNotExist() {
      this.thisUrlDoseNotExist();
      this.thisWaifuDoseNotExist();
      this.thisAnnouceExist();
      this.thisContestExist();
      this.thisProblemExist();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.thisCodingPageDoseNotExist();
    });
  },
  computed: {
    langMap: () => langMap,
  },
  watch: {
    mypid(n, o) {
      this.$router.push({ name: 'coding', params: { cid: this.cid, pid: n } });
    },
    pid(n, o) {
      this.thisProblemExist();
    },
  },
};
</script>
<style lang="scss" scoped>
.is-64o64 {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}
#code {
  height: 600px;
}
#markdown-here {
  color: black;
}
</style>
