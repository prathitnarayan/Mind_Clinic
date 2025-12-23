const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');

// Public
router.post('/', controller.createAppointment);

// Admin
router.get('/', controller.getAppointments);
router.patch('/:id', controller.updateAppointmentStatus);
router.delete('/:id', controller.deleteAppointment);

module.exports = router;
