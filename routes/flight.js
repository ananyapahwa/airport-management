const express = require('express');
const { createFlight } = require('../controllers/flight/flightController');
const router = express.Router();

router.post('/insert-flight', createFlight);

module.exports = router; 