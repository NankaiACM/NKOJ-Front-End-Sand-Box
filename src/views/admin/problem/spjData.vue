<template lang="pug">
a-card(:title="problemId + ' 题目 Special Judge 数据'")
  a-form
    a-form-item(label="Special Judge 文件")
      a-upload(v-model:fileList="fileList", :remove="handleRemove", :beforeUpload="beforeUpload", @change="handleChange")
        a-button 选择 Special Judge 文件
          upload-outlined
    a-form-item(label="Special Judge 语言")
      a-select(v-model:value="selectLang")
        a-select-option(:value="item.value", v-for="(item, idx) in langMap") {{ item.lang }}
    a-form-item
      a-button(type="primary", :disabled="fileList.length === 0", @click="handleUpload") 上传
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import { Options, prop, Vue } from 'vue-class-component';
import { UploadOutlined } from '@ant-design/icons-vue';
import { LangMap } from '@/typescript/constant';
import { apiProblemSPJUpdate } from '@/typescript/api';

class Props {
  problemId = prop({
    type: Number,
    required: true,
  });
}

@Options({
  components: {
    UploadOutlined,
  },
})
export default class extends Vue.with(Props) {
  fileList = [];

  langMap = JSON.parse(JSON.stringify(LangMap));

  selectLang = LangMap[0].value;

  handleRemove() {
    this.fileList = [];
  }

  handleChange() {
    if (this.fileList.length > 1) {
      this.fileList = this.fileList.slice(-1);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  beforeUpload() {
    return false;
  }

  async handleUpload() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await apiProblemSPJUpdate(this.problemId, { lang: Number(this.selectLang), file: (this.fileList[0] as any).originFileObj });
    } catch (e) {
      // do nothing
    }
  }
}
</script>
