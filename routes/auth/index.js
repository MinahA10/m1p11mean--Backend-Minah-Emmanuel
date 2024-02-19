var express = require('express');
var router = express.Router();
const authController = require('../../controllers/Admin/authController');
const serviceController = require('../../controllers/Admin/serviceController');
const userController = require('../../controllers/Admin/userController');
const fonction = require('../../models/fonction');


// Répertoire du fichiers upload
const uploadImageServices = fonction.uploadImage('./public/images/services');
const uploadImageUser = fonction.uploadImage('./public/images/users');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};



// Route auth
router.get('/home', authMiddleware, authController.home);

router.get('/logout', authMiddleware, authController.logout);



// route employe

// Route pour afficher le formulaire de création d'employé
router.get('/new-employe', authMiddleware, function(req, res, next) {
  res.render('pages/employes/create', { layout: "auth", title: "Page d'ajout employé", page: "Formulaire pour ajouté un employé"});
});

// Route pour enregistrer un nouvel employé
router.post('/save-employe', authMiddleware, uploadImageUser.array('photo'), userController.register);

// Route pour voir la liste des employé
router.get('/employes', authMiddleware, userController.listEmployes);




// route service
router.get('/services', authMiddleware, serviceController.list);

router.post('/add-service', authMiddleware, uploadImageServices.array('images_services'), serviceController.created);

router.post('/modification-services', authMiddleware, uploadImageServices.array('images_services'),  serviceController.modificationServices);

router.post('/suppression-service', authMiddleware, serviceController.suppressionService);

router.get('/ajax-services/:id', authMiddleware, serviceController.ajaxSimpleServices);



module.exports = router;