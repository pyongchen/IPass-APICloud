<template>
  <body>
  <activity-header></activity-header>
  </body>
</template>
<script>
  let headerH, footerH;
  function openMain() {
    api.openFrame({
      name: 'activity-main',
      url: '../html/' + 'activity-main' + '.html',
      rect: {
        x: 0,
        y: headerH,
        w: 'auto',
        h: api.winHeight - headerH - footerH
      },
      pageParam: {name: name},
      bounces: true
    });
  }
  export default {
    components: {
      'activity-header': require('../../../componets/activity/header.vue'),
    },
    data() {
      return {
        msg: '12321'
      }
    },
    methods: {},
    mounted() {
      headerH = api.pageParam.headerH + $api.dom('#search').offsetHeight;
      footerH = api.pageParam.footerH;
      window.offsetH = headerH;
      api.setFrameAttr({
        name: 'activity-header',
        rect: {
          x: 0,
          y: api.pageParam.headerH,
          w: 'auto',
          h: $api.dom('#search').offsetHeight
        }
      });
      openMain();
    }
  };
</script>