var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var PlayerSchema = new Schema({
  _id: String,
  password: String,
  phone: String,
  name: String,
  location: String,
  image: String,
  signature: String,
  level: Number,
  overall: Number,
  MVP: Number,
  position: String,
  loseRate: String,
  fans: String,
  idol: String,
  feature: String,
  activePlaces: [String],
  strength: {
    board: Number,
    score: Number,
    assist: Number,
    block: Number,
    defend: Number
  },
  history: {
    wild: {
      win: Number,
      total: Number,
      rate: Number
    },
    three: {
      win: Number,
      total: Number,
      rate: Number
    },
    five: {
      win: Number,
      total: Number,
      rate: Number
    }
  },
  friends: [
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
  teams: [
    {
      _id: String,
      name: String,
      _type: String,
      image: String,
      signature: String,
      overall: Number,
      level: Number,
      fans: String,
      loseRate: String
    }
  ],
  games: {
    one: [
      {
        _id: String,
        time: String,
        location: String,
        status: String,
        message: String,
        opponent: {
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
      }
    ],
    wild: [
      {
        _id: String,
        type_: String,
        title: String,
        level: Number,
        loseRate: String,
        time: String,
        location: String,
        cover: String,
        message: String,
        isStarted: Boolean,
        isJoin: Boolean,
        hasReferee: Boolean,
        numbers: Number,
        reward: Number
      }
    ],
    three: [
      {
        _id: String,
        type_: String,
        title: String,
        level: Number,
        loseRate: String,
        time: String,
        location: String,
        cover: String,
        message: String,
        status: String,
        hasReferee: Boolean,
        reward: Number,
        teams: [
          {
            _id: String,
            name: String,
            type_: String,
            image: String,
            signature: String,
            overall: Number,
            level: Number,
            fans: String,
            loseRate: String
          }
        ]
      }
    ],
    five: [
      {
        _id: String,
        type_: String,
        title: String,
        level: Number,
        loseRate: String,
        time: String,
        location: String,
        cover: String,
        message: String,
        status: String,
        hasReferee: Boolean,
        reward: Number,
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
      }
    ]
  }

});

var player = Mongoose.model('Player', PlayerSchema);

module.exports = player;
