const airlineModel = require('../models/airline');

async function createAirline(req, res) {
  const { airlineId, alName, threeDigitCode } = req.body;
  
  if (!airlineId || !alName || !threeDigitCode) {
    return res.status(400).json({ error: 'Airline ID, Name, and Three Digit Code are required.' });
  }
  
  try {
    const result = await airlineModel.createAirline(airlineId, alName, threeDigitCode);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createAirline controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting airline data.' });
  }
}

module.exports = { createAirline };