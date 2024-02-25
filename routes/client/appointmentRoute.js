const express = require('express');
const appointmentController = require('../../controllers/Client/appointmentControllers');

const router = express.Router();

const verifyToken = require('../../middlewares/authJWT');

router.post('/check-availability',appointmentController.verifyAvailability);
router.post('/create',appointmentController.createAppointment);
router.get('/find',appointmentController.listAppointment);

module.exports = router;