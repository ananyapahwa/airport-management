const express = require('express');
const { 
  createEmployeeSalary
} = require('../controllers/employee/employeeSalaryController');

const router = express.Router();

router.post('/create-employee-salary', createEmployeeSalary);

module.exports = router;
