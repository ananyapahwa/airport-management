const express = require('express');
const { createEmployeeDetails } = require('../controllers/employeeDetailsController');
const router = express.Router();

router.post('/insert-employee-details', createEmployeeDetails);

module.exports = router; 