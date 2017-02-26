import Vue from 'vue';
require('../css/common/aui.css');
require('$api');
require('$icon');


apiready = function () {
  require.ensure(['./app/me/me.vue'], function (require) {
    let App = require('./app/me/me.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

