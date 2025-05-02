const employeeSalaryModel = require('../models/employee_salary');

async function createEmployeeSalary(req, res) {
  const { ssn, salary, bonus, tax_percentage } = req.body;

  if (!ssn || !salary || !tax_percentage) {
    return res.status(400).json({ error: 'SSN, salary, and tax percentage are required.' });
  }

  try {
    const result = await employeeSalaryModel.createEmployeeSalary(ssn, salary, bonus, tax_percentage);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee salary.' });
  }
}

module.exports = { createEmployeeSalary }; 