const express = require('express');
const multer = require('multer');
const EmployeController = require('../../controllers/Admin/EmployeController');

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Route pour afficher le formulaire de création d'employé
router.get('/new-employe', function(req, res, next) {
    res.render('pages/createEmploye', { layout: "auth" });
});

// Route pour enregistrer un nouvel employé
router.post('/save-employe', upload.single('photo'), EmployeController.register);

// Route pour voir la liste des employé
router.get('/employes', EmployeController.listEmployes);

module.exports = router;
