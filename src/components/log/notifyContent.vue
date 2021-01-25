<template lang="pug">
div
  div {{ userMessage }}
  a-button(type="link", @click="showDebugMessage = !showDebugMessage") 调试信息 {{ new Date().toLocaleString() }}
  pre(v-show="showDebugMessage", v-html="debugMessage", style="max-height: 600px;")
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import { Vue, prop, Options } from 'vue-class-component';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/lib/button/style/css';

class Props {
  userMessage = prop({
    type: String,
    required: true,
  });

  debugMessage = prop({
    type: String,
    required: true,
  });
}

@Options({
  components: {
    'a-button': Button,
  },
})
export default class extends Vue.with(Props) {
  showDebugMessage = false;
}
</script>
