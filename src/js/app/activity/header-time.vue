<template>
  <body>
  <header-time></header-time>
  </body>
</template>
<script>
  export default {
    components: {
      'header-time': require('../../../componets/activity/header/time.vue'),
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
      let timeH = $api.dom('#time').offsetHeight;
      api.setFrameAttr({
        name: 'activity-header-' + 'time',
        rect: {
          x: 0,
          y: headerH,
          w: 'auto',
          h: timeH
        },
        bounces: false
      });
    }
  };
</script>