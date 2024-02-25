const express = require('express');
const serviceController = require('../../controllers/Client/servicesController');

const router = express.Router();

// const verifyToken = require('../../middlewares/authJWT');

router.get('/list',serviceController.getServiceList);

module.exports = router;