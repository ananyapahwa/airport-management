const express = require('express');
const { createTicket } = require('../controllers/tickets/ticketDetails');
const { createCancellation } = require('../controllers/tickets/TicketCancel');
const ticketController = require('../controllers/tickets/get-tickets-sorted-by-date');

const router = express.Router();

router.post('/insert-ticket', createTicket);
router.post('/insert-cancellation', createCancellation);

// Get all tickets sorted by date
router.get('/tickets', ticketController.getTicketsSortedByDate);

// Get tickets for a specific passenger
router.get('/passenger/:passportNo', ticketController.getTicketsByPassenger);


module.exports = router;
