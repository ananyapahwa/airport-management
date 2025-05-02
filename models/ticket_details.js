// models/ticketModel.js

const oracledb = require('oracledb');

async function createTicket(date_of_booking, source, destination, travel_class, price) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO TICKET_DETAILS (DATE_OF_BOOKING, SOURCE, DESTINATION, CLASS, PRICE)
      VALUES (TO_DATE(:date_of_booking, 'YYYY-MM-DD'), :source, :destination, :travel_class, :price)
    `;

    await connection.execute(sql, {
      date_of_booking,
      source,
      destination,
      travel_class,
      price
    });

    await connection.commit();
    return { message: 'Ticket inserted successfully.' };
  } catch (err) {
    console.error("Error in createTicket model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createTicket };
