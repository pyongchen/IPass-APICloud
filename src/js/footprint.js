import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/footprint/footprint.vue'], function (require) {
    let App = require('./app/footprint/footprint.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

