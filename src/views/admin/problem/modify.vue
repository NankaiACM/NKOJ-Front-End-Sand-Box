<template lang="pug">
a-tabs(v-model:defaultActiveKey="tabName", @change="tabChange")
  a-tab-pane(tab="基础数据", key="basic")
    ProblemEdit(:problemId="problemId", :preProblemData="preProblemData", @problemDataSubmit="problemUpdate")
  a-tab-pane(tab="输入输出数据", key="io")
    IOData(:problemId="problemId")
  a-tab-pane(tab="Special Judge 数据", key="sp")
    SPJData(:problemId="problemId")

</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import { apiProblemInformation, apiProblemUpdate } from '@/typescript/api';
import { ProblemEditClass } from '@/typescript/class';
import { Options, prop, Vue } from 'vue-class-component';
import * as Diff2Html from 'diff2html';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { createTwoFilesPatch } from 'diff';
import ProblemEdit from './edit.vue';
import IOData from './ioData.vue';
import SPJData from './spjData.vue';
import 'diff2html/bundles/css/diff2html.min.css';

class Props {
  problemId = prop({
    type: Number,
    required: true,
  });

  tabName = prop({
    type: String,
    required: true,
  });
}

@Options({
  components: {
    ProblemEdit,
    IOData,
    SPJData,
  },
})
export default class extends Vue.with(Props) {
  preProblemData = new ProblemEditClass();

  tabChange(activeKey: string) {
    this.$router.push({ params: { problemId: this.problemId, tabName: activeKey } });
  }

  mounted() {
    this.$nextTick(async () => {
      await this.loadData();
    });
  }

  async loadData() {
    try {
      const pIRet = await apiProblemInformation(this.problemId);
      this.preProblemData = ProblemEditClass.inputProblemData(pIRet);
    } catch (e) {
      // do nothing
    }
  }

  problemUpdate(afterProblemData: ProblemEditClass) {
    console.log(this.preProblemData);
    console.log(afterProblemData);
    const oldStr = JSON.stringify(this.preProblemData, null, 2);
    const newStr = JSON.stringify(afterProblemData, null, 2);
    const diffString = createTwoFilesPatch('file', 'file', oldStr, newStr, undefined, undefined, { context: Math.max(oldStr.split('\n').length, newStr.split('\n').length) });
    Modal.confirm({
      title: '确认题目修改信息',
      onOk: async () => {
        try {
          await apiProblemUpdate(this.problemId, afterProblemData);
          await this.loadData();
        } catch (e) {
          // do nothing
          console.log(e);
        }
      },
      onCancel() {
        // do nothing
      },
      content: createVNode('div', {
        innerHTML: Diff2Html.html(diffString, {
          drawFileList: false,
          matching: 'lines',
          outputFormat: 'side-by-side',
        }),
      }),
      class: 'diff-save',
    });
  }
}
</script>
<style>
.diff-save {
  min-width: 800px;
  max-height: 800px;
}
</style>
