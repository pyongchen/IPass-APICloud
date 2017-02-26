import Vue from 'vue';
require('../css/common/aui.css');
require('$api');
require('$aui-dialog');
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('../image/404.png'),
  loading: require('../image/loading.gif'),
});

apiready = function () {
  require.ensure(['./app/info.vue'], function (require) {
    let App = require('./app/info.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

