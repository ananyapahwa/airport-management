const flightModel = require('../models/flight');

async function createFlight(req, res) {
  const { flight_number, departure_time, arrival_time, departure_city, arrival_city, aircraft_id } = req.body;

  if (!flight_number || !departure_time || !arrival_time || !departure_city || !arrival_city || !aircraft_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await flightModel.createFlight(flight_number, departure_time, arrival_time, departure_city, arrival_city, aircraft_id);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createFlight controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting flight data.' });
  }
}

module.exports = { createFlight }; 