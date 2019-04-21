<script>
export default {
  name: 'message-block',
  data() {
    return {};
  },
  props: ['id', 'title', 'content', 'type'],
  beforeMount() {

  },
  mounted() {
    setTimeout(this.deleteSelf, 15000);
  },
  destroyed() {

  },
  computed: {
    isError() {
      return this.$props.error;
    },
  },
  methods: {
    deleteSelf() {
      return this.$parent.$parent.deleteMessage(this.$props.id);
    },
    handleClick() {
      if (this.type === 'refresh') { return this.$router.go(0); }
      return this.deleteSelf();
    },
  },
};
</script>
<!-- vue-loader's scoped css won't work with style-loader -->
<style scoped lang="scss">
@import './message.scss'
</style>

<template>
<div :id="$options.name" :class="[$options.name, `is-${type}`]" @click="handleClick">
  <div style="display: flex"><b v-html="title">  </b>
    <div class="delete" style="margin-left: auto" @click="deleteSelf"></div>
  </div>
  <div class="content" v-html="content"></div>
</div>
</template>
