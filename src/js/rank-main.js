import Vue from 'vue';
require('../css/common/aui.css');
require('$api');
require('$_api');
require('$icon');
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../image/404.png'),
  loading: require('../image/loading.gif'),
});

apiready = function () {
  require.ensure([
    './app/rank/main.vue',
  ], function (require) {
    let App = require('./app/rank/main.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

