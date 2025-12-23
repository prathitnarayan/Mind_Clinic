const router = require('express').Router();
const { getAll } = require('../controllers/appointmentController');
router.get('/', getAll);
module.exports = router;
