<script>
export default {
  name: 'message-block',
  data() {
    return {
      title: '正在查询结果...',
      status: 'unknown',
    };
  },
  props: ['sid'],
  beforeMount() {

  },
  mounted() {
    setTimeout(this.deleteSelf, 15000);
  },
  destroyed() {

  },
  computed: {
    content() {
      return `提交${this.$props.sid}: ${this.status}`;
    },
    icon() {
      return '<i></i>';
    },
    typeClass() {
      return `is-${this.status.replace(/\s/g, '-')}`;
    },
  },
  methods: {
    deleteSelf() {
      return this.$parent.$parent.deleteMessage(this.payload);
    },
    handleClick() {
      if (this.type === 'refresh') { return this.$router.go(0); }
      return this.deleteSelf();
    },
  },
};
</script>

<style scoped lang="scss">
@import './message.scss';

// FIXME:
// scss for loop? array?
// ....

.message-block {
  &.is-unknown{
    background-color: lighten($color: #228b22, $amount: 50);
    color: #228b22;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-accepted{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-presentation-error{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-wrong-answer{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-syscall-not-allowed{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-output-limit-exceed{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-output-limit-exceed{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-memory-limit-exceed{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-time-limit-exceed{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-compile-error{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-runtime-error{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
  &.is-system-error{
    background-color: paleturquoise;
    color: forestgreen;
    &:hover {
      box-shadow: 0 0 10px 2px forestgreen;
    }
  }
}

</style>

<template>
<div :id="$options.name" :class="[$options.name, typeClass]" @click="handleClick">
  <div style="display: flex"><b v-html="title"> </b>
    <div class="delete" style="margin-left: auto" @click="deleteSelf"></div>
  </div>
  <div class="content" v-html="content"></div>
</div>
</template>
