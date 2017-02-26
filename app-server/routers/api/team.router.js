var Team = require('../../controllers/api/team.controller.js');
module.exports = function (router) {
  router.get('/team/:type/:id', Team.getTeamById);
};
