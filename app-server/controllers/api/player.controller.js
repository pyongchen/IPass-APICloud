var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var sendData = require('../../utils/utils').sendData;

exports.getPlayer = function (req, res) {
  var id = req.params.id;
  console.log(id);
  Player.find({_id: id}).exec().then(function (player) {
    return sendData(res, player[0], 'OK');
  })
};

exports.getPlayers = function (req, res) {
  Player.find({}).exec().then(function (players) {
    return sendData(res, players, 'OK');
  })
};
