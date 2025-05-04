const express = require('express');
const { createTicket } = require('../controllers/tickets/ticketDetails');
const { createCancellation } = require('../controllers/tickets/TicketCancel');
const { addFlightTicket } = require ('../controllers/tickets/flight_tickets')
const ticketController = require('../controllers/tickets/get-tickets-sorted-by-date');
const { getSortedTicketsByPrice } = require('../controllers/tickets/sort-tickets-by-price');
const { getFlightsByLayover } = require('../controllers/tickets/getFlightsByLayover');
const router = express.Router();

router.post('/insert-ticket', createTicket);
router.post('/insert-flight-ticket', addFlightTicket );
router.post('/insert-cancellation', createCancellation);

// Get all tickets sorted by date
router.get('/tickets', ticketController.getTicketsSortedByDate);

// Get tickets for a specific passenger
router.get('/passenger/:passportNo', ticketController.getTicketsByPassenger);
router.get('/sorted/:source/:destination', getSortedTicketsByPrice);
router.get('/layover/:layover', getFlightsByLayover); 
module.exports = router;
