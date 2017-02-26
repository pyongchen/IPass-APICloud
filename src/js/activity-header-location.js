import Vue from 'vue';
require('../css/common/aui.css');
require('$api');

//123123123123123
apiready = function () {
  require.ensure(['./app/activity/header-location.vue'], function (require) {
    let App = require('./app/activity/header-location.vue');
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  });
};

