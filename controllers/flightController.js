const flightModel = require('../models/flight');

async function createFlight(req, res) {
  const { flight_id, airline_id, departure_airport, arrival_airport, departure_time, arrival_time, status } = req.body;

  if (!flight_id || !airline_id || !departure_airport || !arrival_airport || !departure_time || !arrival_time || !status) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await flightModel.createFlight(flight_id, airline_id, departure_airport, arrival_airport, departure_time, arrival_time, status);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createFlight controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting flight data.' });
  }
}

async function getFlight(req, res) {
  const { flight_id } = req.params;

  if (!flight_id) {
    return res.status(400).json({ error: 'Flight ID is required.' });
  }

  try {
    const flight = await flightModel.getFlight(flight_id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found.' });
    }
    res.status(200).json(flight);
  } catch (err) {
    console.error("Error in getFlight controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching flight data.' });
  }
}

module.exports = { createFlight, getFlight }; 