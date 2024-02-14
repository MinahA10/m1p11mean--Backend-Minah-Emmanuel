var express = require('express');
var router = express.Router();
const authController = require('../../controllers/authController');
const serviceController = require('../../controllers/serviceController');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/home', authMiddleware, authController.home);

router.get('/logout', authMiddleware, authController.logout);

router.get('/services', authMiddleware, serviceController.list);

module.exports = router;