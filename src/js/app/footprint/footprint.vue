<template>
  <body>
  <footprint-main :data="msg"></footprint-main>
  </body>
</template>
<script>
  export default {
    components: {
      'footprint-main': require('../../../componets/footprint/main.vue'),
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