const express = require('express');
const router = express.Router();
const { getAllFlightsForAnAirport } = require('../models/flightModels/flight');

router.get('/get-all-flights-for-an-airport', getAllFlightsForAnAirport);

module.exports = router;
