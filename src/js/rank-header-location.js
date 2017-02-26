import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/rank/header-location.vue'], function (require) {
    let App = require('./app/rank/header-location.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

