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


// route service
router.get('/services', authMiddleware, serviceController.list);

router.post('/add-service', authMiddleware, serviceController.created);

router.post('/modification-services', authMiddleware, serviceController.modificationServices);

router.post('/suppression-service', authMiddleware, serviceController.suppressionService);

router.get('/ajax-services/:id', authMiddleware, serviceController.ajaxSimpleServices);



module.exports = router;