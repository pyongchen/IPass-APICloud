var mongoose = require('mongoose');
var Team_3 = mongoose.model('Team3');
var Team_5 = mongoose.model('Team5');
var sendData = require('../../utils/utils').sendData;

exports.getTeamById = function (req, res) {
  var id = req.params.id;
  var type = req.params.type;
  var team = {
    '3V3': Team_3,
    '5V5': Team_5
  };
  team[type].find({_id: id}).exec().then(function (team) {
    return sendData(res, team[0], 'OK');
  })
};

