const cityModel = require('../models/city'); 

async function createCity(req, res) {
  const { cname, state, country } = req.body;

  if (!cname || !state || !country) {
    return res.status(400).json({ error: 'City, State, and Country are required.' });
  }

  try {
    const result = await cityModel.createCity(cname, state, country);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createCity controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting city data.' });
  }
}

module.exports = { createCity };
