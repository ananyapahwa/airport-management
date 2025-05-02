const express = require('express');
const {
  createEmployee,
  getEmployee,
  createEmployeeDetails,
  getEmployeeDetails,
  createEmployeeSalary,
  getEmployeeSalary,
  getCompleteEmployeeInfo
} = require('../controllers/employeeController');

const router = express.Router();

// Basic employee routes
router.post('/insert-employee', createEmployee);
router.get('/employee/:ssn', getEmployee);

// Employee details routes
router.post('/insert-employee-details', createEmployeeDetails);
router.get('/employee-details/:ssn', getEmployeeDetails);

// Employee salary routes
router.post('/insert-employee-salary', createEmployeeSalary);
router.get('/employee-salary/:ssn', getEmployeeSalary);

// Complete employee information route
router.get('/employee-complete/:ssn', getCompleteEmployeeInfo);

module.exports = router; 