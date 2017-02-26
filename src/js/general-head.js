import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/general-head.vue'], function (require) {
    let App = require('./app/general-head.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};