import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/rank/header-level.vue'], function (require) {
    let App = require('./app/rank/header-level.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

