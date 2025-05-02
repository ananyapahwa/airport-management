const express = require('express');
const { createFlight, getFlight } = require('../controllers/flightController');
const router = express.Router();

router.post('/insert-flight', createFlight);
router.get('/flight/:flight_id', getFlight);

module.exports = router; 