const ticketModel = require('../models/ticketModel');

async function createTicket(req, res) {
  const { date_of_booking, source, destination, travel_class, price } = req.body;

  if (!date_of_booking || !source || !destination || !travel_class) {
    return res.status(400).json({ error: 'Required fields: date_of_booking, source, destination, travel_class.' });
  }

  try {
    const result = await ticketModel.createTicket(
      date_of_booking,
      source.toUpperCase(),
      destination.toUpperCase(),
      travel_class,
      price
    );
    res.status(201).json({ message: result.message });
  } catch (err) {
    console.error("Error in createTicket controller:", err);
    res.status(500).json({ error: 'An error occurred while inserting ticket data.' });
  }
}

module.exports = { createTicket };
