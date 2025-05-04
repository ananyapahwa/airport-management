const employeeModel = require('../../models/employeeModels/employee');

async function createEmployee(req, res) {
  const {
    E_ID,
    F_NAME,
    M_NAME,
    L_NAME,
    SEX,
    SSN,
    ADDRESS,
    CITY,
    STATE,
    COUNTRY,
    PHONE,
    SALARY, 
    JOB
  } = req.body;

  if (!E_ID || !F_NAME || !L_NAME || !SSN) {
    return res.status(400).json({ error: 'Required fields: E_ID, F_NAME, L_NAME, SSN.' });
  }

  try {
    const result = await employeeModel.createEmployee(
      E_ID, F_NAME, M_NAME, L_NAME, SEX, SSN, ADDRESS, CITY, STATE, COUNTRY, PHONE, SALARY, JOB
    );
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployee controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee data.' });
  }
}

module.exports = {
  createEmployee
};
