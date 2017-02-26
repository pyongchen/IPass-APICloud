var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var GamesWildSchema = new Schema({
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
  caller: {
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
  players: [
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
});

var gamesWild = Mongoose.model('GamesWild', GamesWildSchema);

module.exports = gamesWild;
