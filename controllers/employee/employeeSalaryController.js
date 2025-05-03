const employeeSalaryModel = require('../../models/employeeModels/employee_salary');

async function createEmployeeSalary(req, res) {
  const { jobtype, salary } = req.body;

  if (!jobtype || !salary) {
    return res.status(400).json({ error: 'Required fields: jobtype, salary.' });
  }

  try {
    const result = await employeeSalaryModel.createEmployeeSalary(jobtype, salary);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee salary data.' });
  }
}

async function getAllEmployeeSalaries(req, res) {
  try {
    const salaries = await employeeSalaryModel.getAllEmployeeSalaries();
    res.status(200).json(salaries);
  } catch (err) {
    console.error("Error in getAllEmployeeSalaries controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching employee salaries.' });
  }
}

async function getEmployeeSalaryByJobType(req, res) {
  const { jobtype } = req.params;

  if (!jobtype) {
    return res.status(400).json({ error: 'Job type is required.' });
  }

  try {
    const salary = await employeeSalaryModel.getEmployeeSalaryByJobType(jobtype);
    
    if (!salary) {
      return res.status(404).json({ error: 'Employee salary record not found.' });
    }
    
    res.status(200).json(salary);
  } catch (err) {
    console.error("Error in getEmployeeSalaryByJobType controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching the employee salary.' });
  }
}

async function updateEmployeeSalary(req, res) {
  const { jobtype } = req.params;
  const { salary } = req.body;

  if (!jobtype) {
    return res.status(400).json({ error: 'Job type is required.' });
  }

  if (!salary) {
    return res.status(400).json({ error: 'Salary is required for update.' });
  }

  try {
    const result = await employeeSalaryModel.updateEmployeeSalary(jobtype, salary);
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("Error in updateEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while updating the employee salary.' });
  }
}

async function deleteEmployeeSalary(req, res) {
  const { jobtype } = req.params;

  if (!jobtype) {
    return res.status(400).json({ error: 'Job type is required.' });
  }

  try {
    const result = await employeeSalaryModel.deleteEmployeeSalary(jobtype);
    res.status(200).json({ message: result.message });
  } catch (err) {
    console.error("Error in deleteEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while deleting the employee salary record.' });
  }
}

module.exports = {
  createEmployeeSalary,
  getAllEmployeeSalaries,
  getEmployeeSalaryByJobType,
  updateEmployeeSalary,
  deleteEmployeeSalary
};
