import Vue from 'vue';
require('../css/common/aui.css');
require('$api');
require('$jq');
require('$mui');

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../image/404.png'),
  loading: require('../image/loading.gif'),
});

apiready = function () {
  require.ensure(['./app/games/five.vue'], function (require) {
    let App = require('./app/games/five.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};
