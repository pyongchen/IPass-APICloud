var express = require('express');
var router = express.Router();

var loginRouter = require('./login.router');
var registerRouter = require('./register.router');

// 为所有数据请求的API设置路由级中间件
module.exports = function (app) {
  app.use('/auth', router);
};

//挂载路由
loginRouter(router);
registerRouter(router);
