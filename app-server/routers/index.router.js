var path = require("path");
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  return res.sendFile(path.join(__dirname, '../../../.tmp/serve/app/index.html'))
});

module.exports = router;
