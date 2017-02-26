/**
 * Module dependencies.
 */

TopClient = require('./topClient').TopClient;

var client = new TopClient({
                            'appkey':'23528115',
                            'appsecret':'d66ef1c468d05f6e9c79d7e722ede780',
                            'REST_URL':'http://api.daily.taobao.net/router/rest'});

client.execute('taobao.user.get',
              {
                  'fields':'nick,type,sex,location',
                  'nick':'sandbox_c_1'
              },
              function (error,response) {
                  if(!error)
                    console.log(response);
                  else
                    console.log(error);
              })
