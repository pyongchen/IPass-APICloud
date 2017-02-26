<template>
  <body>
  <rank-header></rank-header>
  </body>
</template>
<script>
  let headerH, footerH;
  function openMain() {
    api.openFrame({
      name: 'rank-main',
      url: '../html/' + 'rank-main' + '.html',
      rect: {
        x: 0,
        y: headerH,
        w: 'auto',
        h: api.winHeight - headerH - footerH
      },
      hScrollBarEnabled: false,
      pageParam: {name: name},
      bounces: true
    });
  }
  export default {
    components: {
      'rank-header': require('../../../componets/rank/header.vue')
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
        name: 'rank-header',
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