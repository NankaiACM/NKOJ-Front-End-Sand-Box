<template lang="pug">
  div
    a-table(:dataSource="data",:columns="columns",:pagination="pagination",@change="change",:rowKey="item => item['solution_id'] + item.when",:loading="loading")
      div(slot="action")
        a-button 重新评测
</template>
<script>
export default {
  data() {
    const columns = [{
      title: '解题编号',
      dataIndex: 'solution_id',
    }, {
      title: '用户名',
      dataIndex: 'nickname',
    }, {
      title: '评测结果',
      dataIndex: 'msg_cn',
    }, {
      title: '运行时间',
      dataIndex: 'time',
      customRender(text) {
        return `${text}ms`;
      },
    }, {
      title: '运行内存',
      dataIndex: 'memory',
      customRender(text) {
        return `${text}KB`;
      },
    }, {
      title: '时间',
      dataIndex: 'when',
      customRender(text) {
        return new Date(text).toLocaleString();
      },
    }, {
      title: '题目',
      dataIndex: 'problem_id',
    }, {
      title: '可选操作',
      scopedSlots: {
        customRender: 'action',
      },
    }];
    return {
      data: [],
      columns,
      pagination: {},
      loading: true,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      this.data = await this.$http.api('status');
      this.loading = false;
    });
  },
  methods: {
    async change(p) {
      const [cur, ps] = [p.current, p.pageSize];
      if (cur === Math.ceil(this.data.length / (ps * 1.0))) {
        this.loading = true;
        const i = this.data[this.data.length - 1];
        const ret = await this.$http.api('ftstatus', { from: i.problem_id, limit: ps * 2 });
        this.data = this.data.concat(ret);
        this.loading = false;
      }
    },
  },
};
</script>
