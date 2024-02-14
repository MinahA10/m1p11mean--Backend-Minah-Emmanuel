function list(req, res, next) {
    res.render('pages/services/list', {layout: 'auth', title: 'Liste des services', page: 'Liste des services'});
}

module.exports = {list};