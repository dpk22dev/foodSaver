var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var app = require('../app');
  //send in showNav false for forcing login
  var params = { "env": app.get('env'), "showNav" : true };
  res.render('index', params );

});

module.exports = router;
