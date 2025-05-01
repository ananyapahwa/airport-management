const express = require('express');
const { createContains } = require('../controllers/containsController');

const router = express.Router();

router.post('/insert-contains', createContains);

module.exports = router;