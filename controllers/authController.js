
function home(req, res, next) {
    let page = req.session.user.role == 1 ? 'Tableau de bord' : 'Liste rendez-vous';
    res.render('pages/home', {layout: 'auth', title: 'Page d\'accueil', page: page});
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