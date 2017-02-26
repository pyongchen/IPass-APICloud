var player = require('../../controllers/api/player.controller.js');
module.exports = function (router) {
  router.get('/players', player.getPlayers);
  router.get('/player/:id', player.getPlayer);
};
