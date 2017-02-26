<template>
  <body>
    <main-part1 :data="msg"></main-part1>
    <main-part2 :data="msg"></main-part2>
    <main-part3 :data="msg"></main-part3>
  </body>
</template>
<script>
  export default {
    components: {
      'main-part1': require('../../../componets/me/part1.vue'),
      'main-part2': require('../../../componets/me/part2.vue'),
      'main-part3': require('../../../componets/me/part3.vue'),
    },
    data() {
      return {
        msg: '12321'
      }
    },
    mounted() {
    }
  };
</script>
<style>
  body {
    background-color: #d0d0d5;
  }
</style>