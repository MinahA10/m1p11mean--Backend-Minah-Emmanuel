var express = require('express');
var router = express.Router();
const User= require('../../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  let error = req.query.error;
  res.render('pages/auth/login', {title: 'Page d\'authentification', error: error});
});

router.get('/password', function(req, res, next) {
  res.render('pages/auth/password', {layout: 'guest', title: 'Réinitialisation de mot de passe'});
});

router.post('/login', async function(req, res) {
  const { email, password } = req.body;
  const userAuth = await User.login(email, password);
  if(userAuth){
    req.session.user = userAuth;
    res.redirect('/auth/home');
  }else{
    const messageError = encodeURIComponent('Nom d\'utlisateur ou mot de passe incorrect');
    res.redirect('/?error=' + messageError);
  }
  
});


module.exports = router;
