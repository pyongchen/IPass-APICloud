import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/rank/header-distance.vue'], function (require) {
    let App = require('./app/rank/header-distance.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

