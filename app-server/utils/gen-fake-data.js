var mongoose = require('../config/mongoose');
var config = require('../config/config');
var Player = require('../modlels/palyer.model');
var Activity = require('../modlels/activity.model');
var Game_3 = require('../modlels/game3.model');
var Game_5 = require('../modlels/game5.model');
var GameWild = require('../modlels/gameWild.model');
var Team_3 = require('../modlels/team3.model');
var Team_5 = require('../modlels/team5.model');
var Hook = require('../modlels/hook.model');
var fs = require('fs');
var db = mongoose().connection.db;

function getPlayers(index) {
  return new Promise(function (resolve, reject) {
      fs.readFile('./players/p' + index + '.json', 'utf8', function (err, res) {
        if (err) reject(err);
        else {
          resolve(JSON.parse(res).data);
        }
      });
    }
  );
}

function getActivities() {
  return new Promise(function (resolve, reject) {
    fs.readFile('./games/games.json', 'utf-8', function (err, res) {
      if (err) reject(err);
      else resolve(JSON.parse(res).data);
    })
  })
}

function getGamesDetail(type, index) {
  return new Promise(function (resolve, reject) {
    fs.readFile('./games/' + type + index + '.json', 'utf-8', function (err, res) {
      if (err) reject(err);
      else resolve(JSON.parse(res).data);
    })
  })
}

function getTeam(type) {
  return new Promise(function (resolve, reject) {
    fs.readFile('./teams/team' + type + '.json', 'utf-8', function (err, res) {
      if (err) reject(err);
      else resolve(JSON.parse(res).data);
    })
  })
}

function getHook(index) {
  return new Promise(function(resolve, reject) {
    fs.readFile('./hooks/p' + index + '.json', 'utf-8', function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res).data);
      }
    });
  });
}

var genPlayerFakeData = function () {
  var index = 10;
  for (var i = 1; i <= index; i++) {
    getPlayers(i).then(function (data) {
      var player = Player(data);
      player.save();
    }).catch(function (err) {
      console.log(err);
    });
  }
};

var genActivityFakeData = function () {
  getActivities().then(function (acts) {
    for (var i = 0; i < acts.length; i++) {
      var act = Activity(acts[i]);
      act.save();
    }
  }).catch(function (err) {
    console.log(err);
  })
};

var genGamesDetailFakeData = function () {
  for (var i = 1; i <= 3; i++) {
    if (i == 1) {
      getGamesDetail('wild', i).then(function (game) {
        var gameWild = GameWild(game);
        gameWild.save();
      }).catch(function (err) {
        console.log(err);
      });
      getGamesDetail('three', i).then(function (game) {
        var game_3 = Game_3(game);
        game_3.save();
      }).catch(function (err) {
        console.log(err);
      });
    }
    getGamesDetail('five', i).then(function (game) {
      var game_5 = Game_5(game);
      game_5.save();
    }).catch(function (err) {
      console.log(err);
    });
  }

};

var genTeamFakeData = function () {
  getTeam('3').then(function (teams) {
    for (var i = 0; i < teams.length; i++) {
      var t3 = Team_3(teams[i]);
      t3.save();
    }
  });
  getTeam('5').then(function (teams) {
    for (var i = 0; i < teams.length; i++) {
      var t5 = Team_5(teams[i]);
      t5.save();
    }
  })
};

var genHookFakeData = function() {
  var index = 10;
  for (var i = 1; i <= index; i++) {
    getHook(i).then(function (data) {
      var hook = Hook(data);
      hook.save();
    }).catch(function (err) {
      console.log(err);
    });
  }
}

function test() {
  Player.find().exec().then(function (players) {
    for (var i = 0; i < players.length; i++) {
      console.log(players[i].name);
    }
  });
}


function genFakeData() {
  genPlayerFakeData();
  genActivityFakeData();
  genGamesDetailFakeData();
  genTeamFakeData();
  genHookFakeData();
}

genFakeData();
setTimeout(function () {
  db.close();
}, 1000);

// test();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1/testdb');
// var Schema = mongoose.Schema;
// var movieSchema = new Schema({
//   doctor   : String,
//   title    : String,
//   language : String,
//   country  : String,
//   year     : Number,
//   summary  : String,
//   poster   : String,
//   flash    : String
// });
// var Movie = mongoose.model('Movie', movieSchema);
// var moive = new Movie({
//   title: '黑衣人三',
//   doctor: '史密斯',
//   year: 2018,
//   flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
//   country: '美国',
//   language: '英语',
//   summary: '好片'
// });
//
// moive.save(function(err) {
//   if (err) {
//     console.log('保存失败');
//     return;
//   }
//   console.log('meow');
// });
