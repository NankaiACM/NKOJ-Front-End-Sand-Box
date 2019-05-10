<template lang="pug">
  div
    a-table(:dataSource="data",:columns="columns",:loading="loading",:rowKey="record => record['problem_id']",@change="change")
      a-button(slot="action") 编辑
</template>
<script>
export default {
  data() {
    const columns = [{
      title: '题目编号',
      dataIndex: 'problem_id',
    }, {
      title: '题目',
      dataIndex: 'title',
    }, {
      title: '可选操作',
      scopedSlots: {
        customRender: 'action',
      },
    }];
    return {
      data: [],
      columns,
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = (await this.$http.api('problemlist', { left: 0, limit: 20 })).list;
      this.loading = false;
    });
  },
  methods: {
    async change(p) {
      const [cur, ps] = [p.current, p.pageSize];
      if (cur === Math.ceil(this.data.length / ps)) {
        this.loading = true;
        const ret = (await this.$http.api('problemlist', { left: this.data.length, limit: 20 })).list;
        this.data = this.data.concat(ret);
        this.loading = false;
      }
    },
  },
};
</script>
