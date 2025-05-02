const express = require('express');
const { createTicket } = require('../controllers/tickets/ticketDetails');
const { createCancellation } = require('../controllers/tickets/TicketCancel');

const router = express.Router();

router.post('/insert-ticket', createTicket);
router.post('/insert-cancellation', createCancellation);

module.exports = router;
