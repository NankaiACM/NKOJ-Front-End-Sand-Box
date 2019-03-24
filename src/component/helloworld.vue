<template lang="pug">
  #helloworld.is-loading helloworld
</template>
<script>
export default {
  name: 'helloworld',
  data () {
    return {
    };
  },
  async mounted () {
    console.log('hello world');
    try {
      console.log(await this.$http.arrapi('newproblem', [1,5]));
      console.log(await this.$http.api('newproblem', {level: 1, count: 4}));
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
