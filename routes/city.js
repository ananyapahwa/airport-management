const express = require('express');
const { createCity } = require('../controllers/cityController'); 
const router = express.Router();

router.post('/insert-city', createCity);

module.exports = router;
