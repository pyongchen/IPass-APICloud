var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');
var Game_3 = mongoose.model("Games_3");
var Game_5 = mongoose.model("Games_5");
var Wild = mongoose.model("GamesWild");
var sendData = require('../../utils/utils').sendData;

exports.getActivities = function (req, res) {
  Activity.find({}).exec().then(function (acts) {
    return sendData(res, acts, 'OK');
  })
};

exports.getActivity = function (req, res) {
  var type = req.params.type;
  var id = req.params.id;
  var game = {
    '3V3': Game_3,
    '5V5': Game_5,
    'wild': Wild
  };
  game[type].find({_id:id}).exec().then(function (game) {
    console.log(type, id);
    return sendData(res, game[0], 'OK');
  })
};
