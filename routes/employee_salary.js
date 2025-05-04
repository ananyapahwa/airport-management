const express = require('express');
const { 
  createEmployeeSalary,
  // getAllEmployeeSalaries,
  // getEmployeeSalaryByJobType,
  // updateEmployeeSalary,
  // deleteEmployeeSalary
} = require('../controllers/employee/employeeSalaryController');

const router = express.Router();

// Employee salary routes
router.post('/create', createEmployeeSalary);
// router.get('/', getAllEmployeeSalaries);
// router.get('/:jobtype', getEmployeeSalaryByJobType);
// router.put('/:jobtype', updateEmployeeSalary);
// router.delete('/:jobtype', deleteEmployeeSalary);

module.exports = router;
