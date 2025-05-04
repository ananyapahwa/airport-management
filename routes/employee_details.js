const express = require('express');
const { 
  createEmployeeDetails
} = require('../controllers/employee/employeeDetailsController');

const router = express.Router();

router.post('/create-employee-details', createEmployeeDetails);

module.exports = router;
