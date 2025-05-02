const cancelTicketsModel = require('../../models/cancelTickets');

async function createCancellation(req, res) {
  const { dateOfCancellation, surcharge } = req.body;
  
  if (!dateOfCancellation) {
    return res.status(400).json({ error: 'Date of cancellation is required.' });
  }
  
  try {
    const result = await cancelTicketsModel.createCancellation(dateOfCancellation, surcharge);
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createCancellation controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting cancellation data.' });
  }
}

module.exports = { createCancellation };