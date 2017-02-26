import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure([
    './app/activity/header.vue',
  ], function (require) {
    let App = require('./app/activity/header.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

