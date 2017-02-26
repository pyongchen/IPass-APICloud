var mongoose = require('mongoose');
var activity = mongoose.model('Activity');
var sendData = require('../../utils/utils').sendData;
var os = require('os');

var publishCache = {};

exports.publish = function (req, res) {
  console.log(req.body);
  return sendData(res, '', 'OK');
};




