var express = require('express');
var router = express.Router();


router.get('/auth-home', function(req, res, next) {
  res.render('pages/home', {layout: "auth"});
});


module.exports = router;