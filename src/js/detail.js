import Vue from 'vue';
require('../css/common/aui.css');
require('$api');
require('$chart');
require('$icon');

apiready = function () {
  require.ensure(['./app/detail.vue'], function (require) {
    let App = require('./app/detail.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

