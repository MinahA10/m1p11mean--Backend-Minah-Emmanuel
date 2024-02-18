var express = require('express');
var router = express.Router();
const guestController = require('../../controllers/Admin/guestController');

/* GET home page. */
router.get('/', guestController.loginPage);

router.get('/password', guestController.password);

router.post('/login', guestController.login);


module.exports = router;
