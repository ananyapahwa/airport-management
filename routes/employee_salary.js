const express = require('express');
const { createEmployeeSalary } = require('../controllers/employeeSalaryController');
const router = express.Router();

router.post('/insert-employee-salary', createEmployeeSalary);

module.exports = router; 