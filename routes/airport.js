const express = require('express');
const { createAirport, getAllAirports } = require('../controllers/airportController');

const router = express.Router();

router.post('/insert-airport', createAirport);
router.get('/get-all-airports', getAllAirports);

module.exports = router;
