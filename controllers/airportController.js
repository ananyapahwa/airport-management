
const airportModel = require('../models/airport');

async function createAirport(req, res) {
  const { ap_name, state, country, cname } = req.body;

  if (!ap_name || !state || !country || !cname) {
    return res.status(400).json({ error: 'All fields are required: ap_name, state, country, cname.' });
  }

  try {
    const result = await airportModel.createAirport(ap_name, state, country, cname);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createAirport controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting airport data.' });
  }
}
async function getAllAirports(req, res) {
  try {
    const airports = await airportModel.getAllAirports();
    res.status(200).json(airports);
  } catch (err) {
    console.error("Error in getAllAirports controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching airports.' });
  }
}

module.exports = { createAirport, getAllAirports };
