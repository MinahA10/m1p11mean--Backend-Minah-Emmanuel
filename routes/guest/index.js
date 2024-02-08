var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/auth/login');
});

router.get('/password', function(req, res, next) {
  res.render('pages/auth/password', {layout: "guest"});
});


module.exports = router;
