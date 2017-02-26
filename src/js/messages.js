import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/messages.vue'], function (require) {
    let App = require('./app/messages.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

