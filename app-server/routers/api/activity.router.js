var act = require('../../controllers/api/activity.controller.js');
module.exports = function (router) {
  router.get('/activities', act.getActivities);
  router.get('/activity/:type/:id', act.getActivity);
};
