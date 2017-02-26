var express = require('express');
var router = express.Router();

var activityRouter = require('./activity.router');
var playerRouter = require('./player.router');
var teamRouter = require('./team.router');
var publishRouter = require('./publish.router');


// 为所有数据请求的API设置路由级中间件
module.exports = function (app) {
  app.use('/api', router);
};

//挂载路由
activityRouter(router);
playerRouter(router);
teamRouter(router);
publishRouter(router);
