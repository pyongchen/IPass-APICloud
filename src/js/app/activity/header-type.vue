<template>
  <body>
  <header-type></header-type>
  </body>
</template>
<script>
  export default {
    components: {
      'header-type': require('../../../componets/activity/header/type.vue'),
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
      let typeH = $api.dom('#type').offsetHeight;
      api.setFrameAttr({
        name: 'activity-header-' + 'type',
        rect: {
          x: 0,
          y: headerH,
          w: 'auto',
          h: typeH
        },
      });
    }
  };
</script>