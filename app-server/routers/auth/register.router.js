var Register = require('../../controllers/auth/register.controller');
module.exports = function (router) {
  router.post('/getCode', Register.getCode);
  router.post('/register', Register.register);
};
