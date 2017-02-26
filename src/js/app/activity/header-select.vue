<template>
  <body>
  <header-select></header-select>
  </body>
</template>
<script>
  export default {
    components: {
      'header-select': require('../../../componets/activity/header/select.vue'),
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
      let selectH = $api.dom('#select').offsetHeight;
      api.setFrameAttr({
        name: 'activity-header-' + 'select',
        rect: {
          x: 0,
          y: headerH,
          w: 'auto',
          h: selectH
        }
      });
    }
  };
</script>