import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/setting.vue'], function (require) {
    let App = require('./app/setting.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

