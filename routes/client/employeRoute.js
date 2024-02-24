const express = require('express');
const employeeController = require('../../controllers/Client/employeeController');

const router = express.Router();

// const verifyToken = require('../../middlewares/authJWT');

router.get('/list',employeeController.getEmployeList);

module.exports = router;