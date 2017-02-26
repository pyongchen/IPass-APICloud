var express = require('./config/express');
var Mongoose = require('./config/mongoose');
var config = require('./config/config');
var http = require('http');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var db = Mongoose();
var app = express();


var server = http.Server(app);
server.listen(config.port, function () {
  console.log("Express server listening on " + config.port);
});

