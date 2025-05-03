const oracledb = require('oracledb');
const { insertTicket } = require('../../models/flight_tickets');

async function addFlightTicket(req, res) {
  const ticket = req.body;

  // Validate ticket fields
  if (
    !ticket.ticket_number ||
    !ticket.source ||
    !ticket.destination ||
    !ticket.date_of_booking ||
    !ticket.date_of_travel ||
    !ticket.seatno ||
    !ticket.class ||
    !ticket.pid ||
    !ticket.passportno
  ) {
    return res.status(400).json({ message: 'All ticket fields are required.' });
  }

  let connection;
  try {
    // Get a connection to the database
    connection = await oracledb.getConnection();

    // Insert the ticket into the database
    await insertTicket(connection, ticket);

    // Send a successful response
    res.status(201).json({ message: 'Ticket inserted successfully.' });
  } catch (err) {
    console.error('Error inserting ticket:', err);
    console.log(err);
    res.status(500).json({ message: 'Error inserting ticket.' });
  } finally {
    // Ensure the connection is closed
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = {
  addFlightTicket
};
