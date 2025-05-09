const express = require('express');
const { 
  createEmployeeDetails
} = require('../controllers/employee/employeeDetailsController');
const { 
  createEmployeeSalary
} = require('../controllers/employee/employeeSalaryController');

const router = express.Router();

router.post('/create-employee-details', createEmployeeDetails);
router.post('/create-employee-salary', createEmployeeSalary);

module.exports = router;
