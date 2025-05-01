const express = require('express');
const { createPassengerRelationship } = require('../controllers/passengerRelationshipController');

const router = express.Router();

router.post('/insert-relationship', createPassengerRelationship);

module.exports = router;
