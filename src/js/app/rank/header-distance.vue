<template>
  <body>
  <header-distance></header-distance>
  </body>
</template>
<script>
  export default {
    components: {
      'header-distance': require('../../../componets/rank/header/distance.vue'),
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
      let distanceH = $api.dom('#distance').offsetHeight;
      api.setFrameAttr({
        name: 'rank-header-' + 'distance',
        rect: {
          x: 0,
          y: headerH,
          w: 'auto',
          h: distanceH
        },
      });
    }
  };
</script>