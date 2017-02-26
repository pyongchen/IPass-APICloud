var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var Games_3Schema = new Schema({
  _id: String,
  _type: String,
  title: String,
  level: Number,
  loseRate: String,
  time: String,
  location: String,
  cover: String,
  message: String,
  status: String,
  hasJoined: Boolean,
  hasReferee: Boolean,
  reward: Number,
  overallLimit: String,
  teams: [
    {
      _id: String,
      name: String,
      image: String,
      signature: String,
      overall: Number,
      level: Number,
      fans: String,
      loseRate: String
    }
  ],
  referees: [
    {
      _id: String,
      name: String,
      image: String,
      level: Number
    }
  ]
});

var games_3 = Mongoose.model('Games_3', Games_3Schema);

module.exports = games_3;
