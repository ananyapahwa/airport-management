const employeeSalaryModel = require('../../models/employeeModels/employee_salary');

async function createEmployeeSalary(req, res) {
  const {
    JOBTYPE,
    SALARY
  } = req.body;

  if (!JOBTYPE || !SALARY) {
    return res.status(400).json({ error: 'Required fields: JOBTYPE, SALARY.' });
  }

  try {
    const result = await employeeSalaryModel.createEmployeeSalary(JOBTYPE, SALARY);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeSalary controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee salary data.' });
  }
}

module.exports = {
  createEmployeeSalary
};
