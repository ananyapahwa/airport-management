const express = require('express');
const { createAirline } = require('../controllers/airlines/airlineController');
const { getAirlines, executeMenuChoice } = require('../controllers/airlines/airline-menu');
const router = express.Router();

router.post('/insert-airline', createAirline);
router.get('/get-airlines', getAirlines);
router.post('/menu', executeMenuChoice);
module.exports = router;