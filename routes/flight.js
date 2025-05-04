const express = require('express');
const { createFlight, getAllFlightsForAnAirline, getAllFlightsForAnAirport } = require('../controllers/flight/flightController');
const router = express.Router();

router.post('/insert-flight', createFlight);
router.get('/get-all-flights-for-an-airline/:airline_id', getAllFlightsForAnAirline);
router.get('/get-all-flights-for-an-airport/:airport_id', getAllFlightsForAnAirport);

module.exports = router; 