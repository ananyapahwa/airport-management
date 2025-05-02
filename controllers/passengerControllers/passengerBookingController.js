const model = require('../../models/passengerModels/passengerBooking');

async function createPassengerBooking(req, res) {
  const { pid, flight_code } = req.body;

  if (!pid || !flight_code) {
    return res.status(400).json({ error: 'Both PID and FLIGHT_CODE are required.' });
  }

  try {
    const result = await model.createPassengerBooking(pid, flight_code);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createPassengerBooking controller:", err);
    res.status(500).json({ error: 'Error inserting passenger booking.' });
  }
}

module.exports = { createPassengerBooking };
