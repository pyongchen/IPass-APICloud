var publish = require('../../controllers/api/publish.controller');
module.exports = function (router) {
  router.post('/publish', publish.publish);
};
