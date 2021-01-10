<template lang="pug">
div
  a-form
    a-form-item(label="用户编号", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-tooltip(placement="right")
        span(slot="title") USER ID
        a-input(v-model="uid")
          a-icon(slot="prefix", type="user")
    a-form-item(label="私信标题", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-input(v-model="title")
        a-icon(slot="prefix", type="notification")
    a-form-item(label="私信内容", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-textarea(rows="4", v-model="message")
    a-form-item(:wrapper-col="{ span: 12, offset: 5 }")
      a-button(type="primary", html-type="submit", @click="whisper", :loading="loading") 发送
</template>
<script>
export default {
  data() {
    return {
      uid: '',
      title: '',
      message: '',
      loading: false,
    };
  },
  methods: {
    async whisper() {
      this.loading = true;
      try {
        await this.$http.objpost('whisper', {
          uid: this.uid,
        }, {
          title: this.title,
          message: this.message,
        });
        this.$message('发送成功');
      } catch (e) {
        this.$message('失败', e);
      }
      this.loading = false;
    },
  },
};
</script>
