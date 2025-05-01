const servesModel = require('../models/serves');

async function createServes(req, res) {
  const { ssn, pid, passportNo } = req.body;
  
  if (!ssn || !pid || !passportNo) {
    return res.status(400).json({ error: 'Employee SSN, Passenger ID, and Passport Number are all required.' });
  }
  
  try {
    const result = await servesModel.createServes(ssn, pid, passportNo);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createServes controller:", err);
    res.status(500).json({ error: 'An error occurred while recording employee-passenger service.' });
  }
}

module.exports = { createServes };