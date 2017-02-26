import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/activity/header-select.vue'], function (require) {
    let App = require('./app/activity/header-select.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

