const passengerModel = require('../../models/passengerModels/passenger');

async function createPassenger(req, res) {
  const {
    passportno,
    fname,
    m,
    lname,
    address,
    phone,
    age,
    sex,
  } = req.body;

  if (!passportno) {
    return res.status(400).json({ error: 'Passport number is required.' });
  }

  try {
    const result = await passengerModel.createPassenger({
      passportno,
      fname,
      m,
      lname,
      address,
      phone,
      age,
      sex,
    });

    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createPassenger controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting passenger data.' });
  }
}

module.exports = { createPassenger };
