import Vue from 'vue';
require('../css/common/aui.css');
require('$api');
require('$_api');
require('$icon');

apiready = function () {
  api.setStatusBarStyle({
    style: 'dark',
    color: '#ffffff'
  });
  require.ensure(['./app/main.vue'], function (require) {
    let App = require('./app/main.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
  api.removeLaunchView();
};