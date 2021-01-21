<template lang="pug">
a-table(:data-source="contestArray", rowKey="contest_id")
  a-table-column(key="contest_id", title="Contest ID", data-index="contest_id")
  a-table-column(key="title", title="Title", data-index="title")
  a-table-column(key="start", title="Start", data-index="during")
    template(v-slot="{text}")
      span {{ JSON.parse(text)[0] }}
  a-table-column(key="end", title="End", data-index="during")
    template(v-slot="{text}")
      span {{ JSON.parse(text)[1] }}
  a-table-column(key="perm", title="Perm", data-index="perm")
  a-table-column(key="private", title="Private", data-index="private")
    template(v-slot="{ text }")
      span {{ text }}
  a-table-column(key="action", title="Action")
    template(#default="{ text, record }")
      a-button(type="link", @click="$router.push({ name: '查看比赛', params: { contestId: Number(record.contest_id) }})") 查看
      a-divider(type="vertical")
      a-button(type="link") 编辑
      a-divider(type="vertical")
      a-button(type="danger", @click="showDeleteConfirm(record)") 删除
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import {
  ContestSimpleEntity,
  apiContestsListAll,
  apiContestDelete,
} from '@/map/api';

export default class ContestList extends Vue {
  contestArray: (ContestSimpleEntity)[] = [];

  loading = true;

  pageSize = 10;

  mounted() {
    this.$nextTick(async () => {
      try {
        this.contestArray = await apiContestsListAll(this.pageSize);
        console.log(this.contestArray);
      } catch (e) {
        // do nothing
      }
      this.loading = false;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showDeleteConfirm(record: ContestSimpleEntity) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const vm = this;
    // so ugly callback chain
    Modal.confirm({
      title: `确认删除比赛 ${record.contest_id} ？`,
      icon: createVNode(ExclamationCircleOutlined),
      content: `比赛标题：${record.title}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // 第一次确认
        const vmm = vm;
        Modal.confirm({
          title: `最后一次确认删除比赛 ${record.contest_id} ？`,
          icon: createVNode(ExclamationCircleOutlined),
          content: `比赛标题：${record.title}`,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            // 第二次确认，最终确认
            vmm.loading = true;
            try {
              await apiContestDelete(record.contest_id);
              vmm.contestArray = await apiContestsListAll(vmm.pageSize);
            } catch (e) {
              // do nothing
            }
            vmm.loading = false;
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
}
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
