const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/sql-queries');

router.get('/passengers/multiple-airlines', reportsController.passengersWithMultipleAirlines);
router.get('/airports/most-employees', reportsController.airportsWithMostEmployees);
router.get('/passengers/business-class', reportsController.businessClassPassengers);
router.get('/tickets/average-price', reportsController.averageTicketPricePerClass);
router.get('/airlines/in-us', reportsController.airlinesInUS);
router.get('/employees/vip-passengers', reportsController.employeesServingVIP);
router.get('/airlines/no-delays', reportsController.airlinesWithoutDelayedFlights);

module.exports = router;
