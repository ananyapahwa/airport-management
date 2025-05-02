const express = require('express');
const { createEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.post('/insert-employee', createEmployee);

module.exports = router; 