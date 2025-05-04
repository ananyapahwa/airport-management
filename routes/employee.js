const express = require('express');
const { 
  createEmployee
} = require('../controllers/employee/employeeController');

const router = express.Router();

// Employee routes
router.post('/create', createEmployee);

module.exports = router;
