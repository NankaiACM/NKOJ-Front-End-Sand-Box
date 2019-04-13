<template>
  <div class="notice" style="z-index: 1000">
    <transition-group name="list">
      <Block v-for="(message, _) in $root.messages" v-bind="message" :key="message.id"></Block>
    </transition-group>
  </div>
</template>

<script>
import Block from './block.vue';

export default {
  name: 'message-list',
  components: {
    Block,
  },
};
</script>

<style scoped>
.notice {
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  width: 300px;
  max-width: 100%;
  background: transparent;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: stretch;
  pointer-events: none;
  padding-bottom: 5vh;
}

.list-enter-active, .list-leave-active {
transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateX(100%);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
