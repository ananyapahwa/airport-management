const express = require('express');
const router = express.Router();
const { getAllFlightsForAnAirline } = require('../models/flightModels/flight');

router.get('/get-all-flights-for-an-airline', getAllFlightsForAnAirline);

module.exports = router;
