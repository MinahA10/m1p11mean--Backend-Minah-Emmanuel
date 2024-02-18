var express = require('express');
var router = express.Router();
const authController = require('../../controllers/Admin/authController');
const serviceController = require('../../controllers/Admin/serviceController');
const userController = require('../../controllers/Admin/userController');

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



// route employe

// Route pour afficher le formulaire de création d'employé
router.get('/new-employe', function(req, res, next) {
  res.render('pages/createEmploye', { layout: "auth" });
});

// Route pour enregistrer un nouvel employé
router.post('/save-employe', upload.single('photo'), userController.register);

// Route pour voir la liste des employé
router.get('/employes', userController.listEmployes);




// route service
router.get('/services', authMiddleware, serviceController.list);

router.post('/add-service', authMiddleware, serviceController.created);

router.post('/modification-services', authMiddleware, serviceController.modificationServices);

router.post('/suppression-service', authMiddleware, serviceController.suppressionService);

router.get('/ajax-services/:id', authMiddleware, serviceController.ajaxSimpleServices);



module.exports = router;