exports.sendData = function(res, data, msg){
  var time;
  time = new Date();
  console.log(data);

  return res.json({
    data: data,
    time: time,
    msg: msg
  });
};
