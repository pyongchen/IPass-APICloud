<template>
  <body>
  <header-level></header-level>
  </body>
</template>
<script>
  export default {
    components: {
      'header-level': require('../../../componets/rank/header/level.vue'),
    },
    data() {
      return {
        msg: '12321'
      }
    },
    methods: {

    },
    mounted() {
      let headerH = api.pageParam.headerH;
      let levelH = $api.dom('#level').offsetHeight;
      api.setFrameAttr({
        name: 'rank-header-' + 'level',
        rect: {
          x: 0,
          y: headerH,
          w: 'auto',
          h: levelH
        },
      });
    }
  };
</script>