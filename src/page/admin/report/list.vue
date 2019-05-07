<template lang="pug">
  div
    a-table(:dataSource="data",:columns="columns",:loading='loading')
      router-link(slot="reporter",slot-scope="reporter",:to="'/space/uid/' + reporter") {{ reporter }}
      router-link(slot="reportee",slot-scope="reportee",:to="'/space/uid/' + reportee") {{ reportee}}
      router-link(slot="which",slot-scope="which",:to="'/discuss/' + which") {{ which }}
      template(slot="handler",slot-scope="handler")
        router-link(v-if="handler",:to="'/space/uid/' + handler") {{ handler }}
        a-tag(v-else) 消歧义：数据为空
      template(slot="result",slot-scope="result")
        a-tag(v-if="result === null") 未处理
        a-tag(v-else-if="result === true", color="red") 认可
        a-tag(v-else-if="result === false") 驳回
</template>
<script>
import generateColumns from './columns';

export default {
  data() {
    return {
      data: [],
      columns: generateColumns(),
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = await this.$http.api('reportlist');
      this.data.map(i => i.key = i.report_id);
      this.loading = false;
    });
  },
};
</script>
