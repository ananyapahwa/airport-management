const express = require('express');
const { createPassenger } = require('../controllers/passengerController');

const router = express.Router();

router.post('/insert-passenger', createPassenger);

module.exports = router;
