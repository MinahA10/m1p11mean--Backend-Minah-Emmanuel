var express = require('express');
var router = express.Router();

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/home', authMiddleware, function(req, res, next) {
  res.render('pages/home', {layout: 'auth', title: 'Page d\'accueil'});
});

router.get('/logout', authMiddleware, function(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur lors de la suppression de la session :', err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;