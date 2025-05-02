const employeeModel = require('../models/employee');

async function createEmployee(req, res) {
  const { ssn, fname, lname, address, phone, email, position } = req.body;

  if (!ssn || !fname || !lname || !address || !phone || !email || !position) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await employeeModel.createEmployee(ssn, fname, lname, address, phone, email, position);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee data.' });
  }
}

module.exports = { createEmployee }; 