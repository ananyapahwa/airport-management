const express = require('express');
const { createCancellation } = require('../controllers/TicketCancel');

const router = express.Router();

router.post('/insert-cancellation', createCancellation);

module.exports = router;