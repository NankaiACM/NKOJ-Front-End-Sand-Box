<template lang="pug">
div
  a-table(:dataSource="data",:columns="columns",:loading="loading")
    template(slot="result",slot-scope="text, record")
      a-button(type="danger") 认可举报
      a-divider(type="vertical")
      a-button(type="dashed") 驳回举报
</template>
<script>
import generateColumns from './columns';

export default {
  data() {
    return {
      data: [],
      columns: generateColumns().filter((i) => i.key !== 'handler').map((i) => {
        if (i.key === 'result') i.title = '可选操作';
        if (i.key === 'reporter' || i.key === 'reportee') {
          i.customRender = (value) => {
            const url = `/space/uid/${value}`;
            return <a href={url} target="_blank">{value}</a>;
          };
        }
        if (i.key === 'which') {
          i.customRender = (value) => {
            const url = `/discuss${value}`;
            return <a href={url} target="_blank">{value}</a>;
          };
        }
        return i;
      }),
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = await this.$http.api('reportinqueue');
      this.data.map((i) => {
        i.key = i.report_id;
        delete i.handler;
        return i;
      });
      this.loading = false;
    });
  },
};
</script>
