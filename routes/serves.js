const express = require('express');
const { createServes } = require('../controllers/servesController');

const router = express.Router();

router.post('/insert-serves', createServes);

module.exports = router;