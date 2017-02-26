var Login = require('../../controllers/auth/login.controller');
module.exports = function (router) {
  router.post('/login', Login.login);
  router.post('/logout', Login.logout);
  router.post('/isLogin', Login.isLogin);
};
