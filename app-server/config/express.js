var express = require("express");
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var indexRoute = require('../routers/index.router.js');

module.exports = function () {
  var app = express();
  setExpressMiddleware(app);
  setExpressRoute(app);
  return app;
};

// 设置express应用路由
var setExpressRoute = function(app){
  require('../routers/api/api.config.router')(app);
  require('../routers/auth/auth.config.router')(app);
};

// 设置express应用级中间件
var setExpressMiddleware = function(app){
  app.use(cookieParser());
  app.use(cors());
  app.use(session({
    name: 'ipass',
    secret: 'ipass',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000
    }
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  console.log(path.join(__dirname, "../../../.tmp/serve"));
  app.use(express['static'](path.join(__dirname, "../../../.tmp/serve/")));
  app.use(express['static'](path.join(__dirname, "../../")));
  app.use(express['static'](path.join(__dirname, '../../../')));
  app.use('/', indexRoute);
};
