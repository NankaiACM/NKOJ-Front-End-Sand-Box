<template lang="pug">
a-card(:title="problemId + ' 题目输入输出数据'")
  a-space(direction="vertical", style="width: 100%;")
    a-alert(message="请输入输出文件压缩在 ZIP 压缩包顶层目录中.")
    a-alert(message="压缩包内输入与输出文件一一对应, 格式：'a1.in' 'a1.out'.")
    a-upload(v-model:fileList="fileList", :remove="handleRemove", :beforeUpload="beforeUpload", @change="handleChange")
      a-button 选择压缩包
        upload-outlined
    a-button(type="primary", :disabled="fileList.length === 0", @click="handleUpload") 上传
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import { Options, prop, Vue } from 'vue-class-component';
import { UploadOutlined } from '@ant-design/icons-vue';
import { apiProblemIODataUpdate } from '@/typescript/api';

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
  fileList = []

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
      await apiProblemIODataUpdate(this.problemId, { file: (this.fileList[0] as any).originFileObj });
    } catch (e) {
      // do nothing
    }
  }
}
</script>
