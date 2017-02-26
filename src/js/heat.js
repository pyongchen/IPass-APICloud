import Vue from 'vue';
require('../css/common/aui.css');
require('$api');


apiready = function () {
  require.ensure(['./app/heat.vue'], function (require) {
    let App = require('./app/heat.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

