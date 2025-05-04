const express = require('express');
const router = express.Router();
const { getAllAirlines } = require('../controllers/airlineController');

router.get('/get-all-airlines', getAllAirlines);

module.exports = router;

