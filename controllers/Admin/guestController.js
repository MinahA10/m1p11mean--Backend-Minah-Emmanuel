const User = require('../../models/user');

function loginPage(req, res, next) {
    let error = req.query.error;
    res.render('pages/auth/login', {title: 'Page d\'authentification', error: error});
}

function password(req, res, next) {
    res.render('pages/auth/password', {layout: 'guest', title: 'Réinitialisation de mot de passe'});
}

async function login(req, res) {
    const { email, password } = req.body;
    const userAuth = await User.login(email, password);
    if(userAuth){
      req.session.user = userAuth;
      res.redirect('/auth/home');
    }else{
      const messageError = encodeURIComponent('Nom d\'utlisateur ou mot de passe incorrect');
      res.redirect('/?error=' + messageError);
    }
}

module.exports = {loginPage, password, login}