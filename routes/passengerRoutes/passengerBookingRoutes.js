const express = require('express');
const { createPassengerBooking } = require('../controllers/passengerBookingController');

const router = express.Router();

router.post('/insert-booking', createPassengerBooking);

module.exports = router;
