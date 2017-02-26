<template>
  <body>
  <rank-main :data="msg"></rank-main>
  </body>
</template>
<script>
  export default {
    components: {
      'rank-main': require('../../../componets/rank/main.vue'),
    },
    data() {
      return {
        msg: '12321'
      }
    },
    methods: {
    },
  };
</script>