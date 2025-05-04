const flightModel = require('../../models/flightModels/flight');

async function createFlight(req, res) {
  const {
    FLIGHT_CODE,
    SOURCE,
    DESTINATION,
    ARRIVAL,
    DEPARTURE,
    STATUS,
    DURATION,
    FLIGHTTYPE,
    LAYOVER_TIME,
    NO_OF_STOPS,
    AIRLINEID
  } = req.body;

  // Validation
  if (
    !FLIGHT_CODE || !SOURCE || !DESTINATION || !ARRIVAL || !DEPARTURE ||
    !STATUS || !DURATION || !FLIGHTTYPE || NO_OF_STOPS === undefined || !AIRLINEID
  ) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await flightModel.createFlight({
      FLIGHT_CODE,
      SOURCE,
      DESTINATION,
      ARRIVAL,
      DEPARTURE,
      STATUS,
      DURATION,
      FLIGHTTYPE,
      LAYOVER_TIME,
      NO_OF_STOPS,
      AIRLINEID
    });

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

async function getAllFlightsForAnAirline(req, res) {
  const { airline_id } = req.params;

  if (!airline_id) {
    return res.status(400).json({ error: 'Airline ID is required.' });
  }

  try {
    const flights = await flightModel.getAllFlightsForAnAirline(airline_id);
    res.status(200).json(flights);
  } catch (err) {
    console.error("Error in getAllFlightsForAnAirline controller:", err);
    res.status(500).json({ error: 'An error occurred while fetching flights for an airline.' });
  }
}

module.exports = { createFlight, getFlight, getAllFlightsForAnAirline };
