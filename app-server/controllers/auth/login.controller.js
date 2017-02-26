var sendData = require('../../utils/utils').sendData;
var User = require('../../modlels/palyer.model');
var mongoose = require('mongoose');
var crypto = require('crypto');

// 加密函数
var md5 = function(data) {
  return crypto.createHash('md5').update(data).digest('hex');
};

var loginUser = {};

exports.login = function (req, res) {
  var data = req.body;
  var info = {};
  User.findOne({'phone': data.phone}).exec().then(function (player) {
    if(!player) {
      info.err = "用户名不存在";
    } else {
      if(player.password != md5(data.password)) {
        info.err = "密码错误,请重试";
      } else {
        req.session.userId = player._id;
        req.session.cookie.maxAge = 36000000;
        console.log(req.cookies);
        info.id = player._id;
      }
    }
    return sendData(res, info, 'OK');
  });
};

exports.isLogin = function (req, res) {
  console.log(req.session);
  if(!req.session.userId) sendData(res, false, 'OK');
  else sendData(res, req.session.userId, 'OK');
};

exports.logout = function (req, res) {
  delete req.session.userId;
  sendData(res, true, 'OK');
};
