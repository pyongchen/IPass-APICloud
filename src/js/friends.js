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
  require.ensure(['./app/friends.vue'], function (require) {
    let App = require('./app/friends.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    });
  });
};

