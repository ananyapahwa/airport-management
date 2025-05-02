const containsModel = require('../models/contains');

async function createContains(req, res) {
  const { airlineId, apName } = req.body;
  
  if (!airlineId || !apName) {
    return res.status(400).json({ error: 'Airline ID and Airport Name are both required.' });
  }
  
  try {
    const result = await containsModel.createContains(airlineId, apName);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createContains controller:", err);
    res.status(500).json({ error: 'An error occurred while creating airline-airport relationship.' });
  }
}

module.exports = { createContains };