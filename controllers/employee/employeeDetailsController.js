const employeeDetailsModel = require('../models/employee_details');

async function createEmployeeDetails(req, res) {
  const { ssn, join_date, department, supervisor_ssn } = req.body;

  if (!ssn || !join_date || !department) {
    return res.status(400).json({ error: 'SSN, join date, and department are required.' });
  }

  try {
    const result = await employeeDetailsModel.createEmployeeDetails(ssn, join_date, department, supervisor_ssn);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee details.' });
  }
}

module.exports = { createEmployeeDetails }; 