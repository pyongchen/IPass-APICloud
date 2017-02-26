import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/ballHoop.vue'], function (require) {
    let App = require('./app/ballHoop.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

