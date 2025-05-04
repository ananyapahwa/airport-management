const employeeDetailsModel = require('../../models/employeeModels/employee_details');

async function createEmployeeDetails(req, res) {
  const {
    SSN,
    FNAME,
    M,
    LNAME,
    ADDRESS,
    PHONE,
    AGE,
    SEX,
    JOBTYPE,
    ASTYPE,
    ETYPE,
    SHIFT,
    POSITION,
    AP_NAME
  } = req.body;

  if (!SSN || !FNAME || !LNAME || !AP_NAME) {
    return res.status(400).json({ error: 'Required fields: SSN, FNAME, LNAME, AP_NAME.' });
  }

  try {
    const result = await employeeDetailsModel.createEmployeeDetails(
      SSN, FNAME, M, LNAME, ADDRESS, PHONE, AGE, SEX, JOBTYPE, ASTYPE, ETYPE, SHIFT, POSITION, AP_NAME
    );
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createEmployeeDetails controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting employee details.' });
  }
}

module.exports = {
  createEmployeeDetails
};
