const express = require('express');
const { createPassengerBooking } = require('../controllers/passengerControllers/passengerBookingController');
const { createPassengerRelationship } = require('../controllers/passengerControllers/passengerRelationshipController');
const { createPassenger } = require('../controllers/passengerControllers/passengerController');
const { getPassengersForFlight } = require('../controllers/passengerControllers/get-all-passengers-for-a-flight');

const router = express.Router();

router.post('/insert-booking', createPassengerBooking);
router.post('/insert-relationship', createPassengerRelationship);
router.post('/insert-passenger', createPassenger);
router.get('/flights/:flight_code', getPassengersForFlight);

module.exports = router;
