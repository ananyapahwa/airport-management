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
    const result = await flightModel.insertFlight({
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

module.exports = { createFlight };
