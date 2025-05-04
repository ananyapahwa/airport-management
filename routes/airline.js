const express = require('express');
const { createAirline, getAllAirlines } = require('../controllers/airlineController');

const router = express.Router();

router.post('/insert-airline', createAirline);
router.get('/get-all-airlines', getAllAirlines);

module.exports = router;