const express = require('express');
const { 
  createEmployeeDetails
} = require('../controllers/employee/employeeDetailsController');

const router = express.Router();

router.post('/create', createEmployeeDetails);

module.exports = router;
