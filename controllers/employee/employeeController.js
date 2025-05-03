const employeeModel = require('../../models/employeeModels/employee');

async function createEmployee(req, res) {
  const { e_id, f_name, m_name, l_name, sex, ssn, address, city, state, country, phone, salary, job } = req.body;

  if (!e_id || !f_name || !l_name || !ssn) {
    return res.status(400).json({ error: 'Required fields: e_id, f_name, l_name, ssn.' });
  }

  try {
    const result = await employeeModel.createEmployee(
      e_id, f_name, m_name, l_name, sex, ssn, address, city, state, country, phone, salary, job
    );
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee data.' });
  }
}

async function getAllEmployees(req, res) {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error in getAllEmployees controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employees.' });
  }
}

async function getEmployeeById(req, res) {
  const { e_id } = req.params;

  if (!e_id) {
    return res.status(400).json({ error: 'Employee ID is required.' });
  }

  try {
    const employee = await employeeModel.getEmployeeById(e_id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error in getEmployeeById controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching the employee.' });
  }
}

async function updateEmployee(req, res) {
  const { e_id } = req.params;
  const updateData = req.body;

  if (!e_id) {
    return res.status(400).json({ error: 'Employee ID is required.' });
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No update data provided.' });
  }

  try {
    const result = await employeeModel.updateEmployee(e_id, updateData);
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("Error in updateEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while updating the employee.' });
  }
}

async function deleteEmployee(req, res) {
  const { e_id } = req.params;

  if (!e_id) {
    return res.status(400).json({ error: 'Employee ID is required.' });
  }

  try {
    const result = await employeeModel.deleteEmployee(e_id);
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("Error in deleteEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while deleting the employee.' });
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
