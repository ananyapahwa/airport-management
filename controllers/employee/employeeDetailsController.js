const employeeDetailsModel = require('../../models/employeeModels/employee_details');

async function createEmployeeDetails(req, res) {
  const { ssn, fname, m, lname, address, phone, age, sex, jobtype, astype, etype, shift, position, ap_name } = req.body;

  if (!ssn || !fname || !lname || !ap_name) {
    return res.status(400).json({ error: 'Required fields: ssn, fname, lname, ap_name.' });
  }

  try {
    const result = await employeeDetailsModel.createEmployeeDetails(
      ssn, fname, m, lname, address, phone, age, sex, jobtype, astype, etype, shift, position, ap_name
    );
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee details.' });
  }
}

async function getAllEmployeeDetails(req, res) {
  try {
    const employees = await employeeDetailsModel.getAllEmployeeDetails();
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error in getAllEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employee details.' });
  }
}

async function getEmployeeDetailsBySsn(req, res) {
  const { ssn } = req.params;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  try {
    const employee = await employeeDetailsModel.getEmployeeDetailsBySsn(ssn);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee details not found.' });
    }
    
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error in getEmployeeDetailsBySsn controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching the employee details.' });
  }
}

async function getEmployeeDetailsByAirport(req, res) {
  const { ap_name } = req.params;

  if (!ap_name) {
    return res.status(400).json({ error: 'Airport name is required.' });
  }

  try {
    const employees = await employeeDetailsModel.getEmployeeDetailsByAirport(ap_name);
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error in getEmployeeDetailsByAirport controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employee details.' });
  }
}

async function updateEmployeeDetails(req, res) {
  const { ssn } = req.params;
  const updateData = req.body;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No update data provided.' });
  }

  try {
    const result = await employeeDetailsModel.updateEmployeeDetails(ssn, updateData);
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("Error in updateEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while updating the employee details.' });
  }
}

async function deleteEmployeeDetails(req, res) {
  const { ssn } = req.params;

  if (!ssn) {
    return res.status(400).json({ error: 'SSN is required.' });
  }

  try {
    const result = await employeeDetailsModel.deleteEmployeeDetails(ssn);
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("Error in deleteEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while deleting the employee details.' });
  }
}

module.exports = {
  createEmployeeDetails,
  getAllEmployeeDetails,
  getEmployeeDetailsBySsn,
  getEmployeeDetailsByAirport,
  updateEmployeeDetails,
  deleteEmployeeDetails
};
