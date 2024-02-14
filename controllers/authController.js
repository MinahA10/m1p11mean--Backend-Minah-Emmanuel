
function home(req, res, next) {
    res.render('pages/home', {layout: 'auth', title: 'Page d\'accueil', page: 'Tableau de bord'});
}

function logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la suppression de la session :', err);
      } else {
        res.redirect('/');
      }
    });
  }

module.exports = {home, logout}