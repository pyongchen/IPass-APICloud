var sendData = require('../../utils/utils').sendData;
var mongoose = require('mongoose');
var TopClient = require('../../message-sdk/topClient').TopClient;

var client = new TopClient({
  'appkey': '23528115',
  'appsecret': 'd66ef1c468d05f6e9c79d7e722ede780',
  'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

var phoneReq = {
  extend:'',
  sms_type:'normal',
  sms_free_sign_name:'IPASS爱传球',
  sms_param: {
    phone: '1234'
  },
  rec_num:'15521297047',
  sms_template_code:'SMS_25855237'
};

var codeCache = {};

exports.getCode = function (req, res) {
  phoneReq.rec_num = req.body.phone;
  var randNum = Math.floor(Math.random() * 9000) + 1000;
  phoneReq.sms_param.phone = randNum.toString();
  codeCache[phoneReq.rec_num] = randNum.toString();
  client.execute('alibaba.aliqin.fc.sms.num.send', phoneReq, function(error, response) {
    if (!error) console.log('获取验证码成功');
    else console.log(error);
    return sendData(res, response, 'OK');
  });
};

exports.register = function (req, res) {
  var phone = req.body.phone;
  var password = req.body.phone;
  var code = req.body.code.toString();
  var result = {};
  if(codeCache[phone] == code) {
    result.info = '验证码正确';
    //将注册信息存入数据库
    return sendData(res, result, 'OK');
  } else {
    result.info = '验证码不正确';
    return sendData(res, result, 'OK');
  }
};
