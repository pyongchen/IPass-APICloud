<template>
  <body>
  <header-location></header-location>
  </body>
</template>
<script>
  export default {
    components: {
      'header-location': require('../../../componets/rank/header/location.vue'),
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
      let locationH = $api.dom('#location').offsetHeight;
      api.setFrameAttr({
        name: 'rank-header-' + 'location',
        rect: {
          x: 0,
          y: headerH,
          w: 'auto',
          h: locationH
        },
      });
    }
  };
</script>