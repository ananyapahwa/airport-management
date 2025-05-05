const employeeModel = require('../models/employeeModels/employee_details');

// Basic employee operations
async function createEmployee(req, res) {
  const { ssn, fname, lname, address, phone, email, role } = req.body;

  if (!ssn || !fname || !lname || !address || !phone || !email || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await employeeModel.createEmployee(ssn, fname, lname, address, phone, email, role);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee data.' });
  }
}

async function getEmployee(req, res) {
  const { ssn } = req.params;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  try {
    const employee = await employeeModel.getEmployee(ssn);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error in getEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employee data.' });
  }
}

// Employee details operations
async function createEmployeeDetails(req, res) {
  const { ssn, join_date, department, position, supervisor_ssn } = req.body;

  if (!ssn || !join_date || !department || !position) {
    return res.status(400).json({ error: 'SSN, join date, department, and position are required.' });
  }

  try {
    const result = await employeeModel.createEmployeeDetails(ssn, join_date, department, position, supervisor_ssn);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee details.' });
  }
}

async function getEmployeeDetails(req, res) {
  const { ssn } = req.params;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  try {
    const details = await employeeModel.getEmployeeDetails(ssn);
    if (!details) {
      return res.status(404).json({ error: 'Employee details not found.' });
    }
    res.status(200).json(details);
  } catch (err) {
    console.error("Error in getEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employee details.' });
  }
}

// Employee salary operations
async function createEmployeeSalary(req, res) {
  const { ssn, salary, bonus, tax_deductions } = req.body;

  if (!ssn || !salary) {
    return res.status(400).json({ error: 'SSN and salary are required.' });
  }

  try {
    const result = await employeeModel.createEmployeeSalary(ssn, salary, bonus, tax_deductions);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee salary.' });
  }
}

async function getEmployeeSalary(req, res) {
  const { ssn } = req.params;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  try {
    const salary = await employeeModel.getEmployeeSalary(ssn);
    if (!salary) {
      return res.status(404).json({ error: 'Employee salary not found.' });
    }
    res.status(200).json(salary);
  } catch (err) {
    console.error("Error in getEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employee salary.' });
  }
}

// Get complete employee information
async function getCompleteEmployeeInfo(req, res) {
  const { ssn } = req.params;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  try {
    const employeeInfo = await employeeModel.getCompleteEmployeeInfo(ssn);
    if (!employeeInfo) {
      return res.status(404).json({ error: 'Employee information not found.' });
    }
    res.status(200).json(employeeInfo);
  } catch (err) {
    console.error("Error in getCompleteEmployeeInfo controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching complete employee information.' });
  }
}

module.exports = {
  createEmployee,
  getEmployee,
  createEmployeeDetails,
  getEmployeeDetails,
  createEmployeeSalary,
  getEmployeeSalary,
  getCompleteEmployeeInfo
}; 