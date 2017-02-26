var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');
var sendData = require('../../utils/utils').sendData;

exports.getActivities = function (req, res) {
  Activity.find({}).exec().then(function (acts) {
    return sendData(res, acts, 'OK');
  })
};

