const express = require('express');
const { createAirline } = require('../controllers/airlineController');

const router = express.Router();

router.post('/insert-airline', createAirline);

module.exports = router;