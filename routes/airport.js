const express = require('express');
const { createAirport } = require('../controllers/airportController');

const router = express.Router();

router.post('/insert-airport', createAirport);

module.exports = router;
