const express = require('express');
const { createTicket } = require('../controllers/tickets/ticketDetails');
const { createCancellation } = require('../controllers/tickets/TicketCancel');
const ticketController = require('../controllers/tickets/get-tickets-sorted-by-date');
const flightTicketsController = require('../controllers/tickets/flight_tickets');

const router = express.Router();

router.post('/insert-ticket', createTicket);
router.post('/insert-cancellation', createCancellation);

// Get all tickets sorted by date
router.get('/tickets', ticketController.getTicketsSortedByDate);

// Get tickets for a specific passenger
router.get('/passenger/:passportNo', ticketController.getTicketsByPassenger);

// Flight tickets routes
router.post('/flight-tickets', flightTicketsController.addFlightTicket);
router.get('/flight-tickets', flightTicketsController.getAllFlightTickets);
router.get('/flight-tickets/:ticketNumber', flightTicketsController.getFlightTicketByNumber);
router.get('/flight-tickets/passenger/:pid/:passportno', flightTicketsController.getFlightTicketsByPassenger);
router.delete('/flight-tickets/:ticketNumber', flightTicketsController.deleteFlightTicket);

module.exports = router;
