var config = require('./config'),
    mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

module.exports = function () {
  var db = mongoose.connect(config.db);
  var Activity = require('../modlels/activity.model');
  var Game3 = require('../modlels/game3.model');
  var Game5 = require('../modlels/game5.model');
  var gameWild = require('../modlels/gameWild.model');
  var player = require('../modlels/palyer.model');
  var team3 = require('../modlels/team3.model');
  var team5 = require('../modlels/team5.model');
  return db;
};

