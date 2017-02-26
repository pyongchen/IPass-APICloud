import Vue from 'vue';
require('../css/common/aui.css');
require('../css/mui/mui.min.css');
require('$api');
require('$mui');

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../image/404.png'),
  loading: require('../image/loading.gif'),
});

apiready = function () {
  require.ensure(['./app/games/one.vue'], function (require) {
    let App = require('./app/games/one.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};
