const express = require('express');
const router = express.Router();
const { getAllAirports } = require('../models/airportModels/airport');

router.get('/get-all-airports', getAllAirports);

module.exports = router;
