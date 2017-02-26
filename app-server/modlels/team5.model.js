var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var team_5Schema = new Schema({
  _id: String,
  name: String,
  image: String,
  overall: Number,
  _type: String,
  level: Number,
  fans: String,
  loseRate: String,
  signature: String,
  header: {
    _id: String,
    name: String,
    image: String,
    signature: String,
    level: Number,
    overall: Number,
    loseRate: String,
    fans: String,
    MVP: Number
  },
  members: {
    starting: [
      {
        _id: String,
        name: String,
        image: String,
        signature: String,
        level: Number,
        overall: Number,
        loseRate: String,
        fans: String,
        MVP: Number
      }
    ],
    substitution: [
      {
        _id: String,
        name: String,
        image: String,
        signature: String,
        level: Number,
        overall: Number,
        loseRate: String,
        fans: String,
        MVP: Number
      }
    ]
  }
});

var team_5 = Mongoose.model('Team5', team_5Schema);

module.exports = team_5;
