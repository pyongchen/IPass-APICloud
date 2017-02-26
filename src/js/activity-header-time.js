import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/activity/header-time.vue'], function (require) {
    let App = require('./app/activity/header-time.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

