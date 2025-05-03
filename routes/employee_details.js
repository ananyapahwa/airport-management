const express = require('express');
const { 
  createEmployeeDetails,
  getAllEmployeeDetails,
  getEmployeeDetailsBySsn,
  getEmployeeDetailsByAirport,
  updateEmployeeDetails,
  deleteEmployeeDetails
} = require('../controllers/employee/employeeDetailsController');

const router = express.Router();

// Employee details routes
router.post('/create', createEmployeeDetails);
router.get('/', getAllEmployeeDetails);
router.get('/ssn/:ssn', getEmployeeDetailsBySsn);
router.get('/airport/:ap_name', getEmployeeDetailsByAirport);
router.put('/:ssn', updateEmployeeDetails);
router.delete('/:ssn', deleteEmployeeDetails);

module.exports = router;
