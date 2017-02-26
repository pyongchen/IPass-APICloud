import Vue from 'vue';
require('../css/common/aui.css');
require('../css/mui/swiper.min.css');
require('$api');
// require('$jq');
// require('$swiper');

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../image/404.png'),
  loading: require('../image/loading.gif'),
});

apiready = function () {
  require.ensure(['./app/games.vue'], function (require) {
    let App = require('./app/games.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};
