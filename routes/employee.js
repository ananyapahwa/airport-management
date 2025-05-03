const express = require('express');
const { 
  createEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee 
} = require('../controllers/employee/employeeController');

const router = express.Router();

// Employee routes
router.post('/create', createEmployee);
router.get('/', getAllEmployees);
router.get('/:e_id', getEmployeeById);
router.put('/:e_id', updateEmployee);
router.delete('/:e_id', deleteEmployee);

module.exports = router;
