const model = require('../../models/passengerModels/passengerRelationship');

async function createPassengerRelationship(req, res) {
  const { pid, passportno } = req.body;

  if (!pid || !passportno) {
    return res.status(400).json({ error: 'Both PID and PASSPORTNO are required.' });
  }

  try {
    const result = await model.createPassengerRelationship(pid, passportno);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createPassengerRelationship controller:", err);
    res.status(500).json({ error: 'Error inserting passenger relationship.' });
  }
}

module.exports = { createPassengerRelationship };
