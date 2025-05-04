const express = require('express');
const { createAirline, getAllAirlines } = require('../controllers/airlines/airlineController');
const { getAirlines, executeMenuChoice } = require('../controllers/airlines/airline-menu');
const router = express.Router();

router.post('/insert-airline', createAirline);
router.get('/get-airlines', getAirlines);
router.post('/menu', executeMenuChoice);router.get('/get-all-airlines', getAllAirlines);

module.exports = router;