const oracledb = require('oracledb');

// Function to insert a new flight ticket into the database
async function insertTicket(connection, ticket) {
  const sql = `
    INSERT INTO FLIGHT_TICKETS (
      TICKET_NUMBER, SOURCE, DESTINATION, DATE_OF_BOOKING, 
      DATE_OF_TRAVEL, SEATNO, CLASS, DATE_OF_CANCELLATION,
      PID, PASSPORTNO
    ) VALUES (
      :TICKET_NUMBER, :SOURCE, :DESTINATION,  TO_DATE(:DATE_OF_BOOKING,'YYYY-MM-DD'),
       TO_DATE(:DATE_OF_TRAVEL,'YYYY-MM-DD'), :SEATNO, :CLASS, :DATE_OF_CANCELLATION,
      :PID, :PASSPORTNO
    )
  `;
  
  const binds = {
    TICKET_NUMBER: ticket.ticket_number,
    SOURCE: ticket.source,
    DESTINATION: ticket.destination,
    DATE_OF_BOOKING: ticket.date_of_booking,
    DATE_OF_TRAVEL: ticket.date_of_travel,
    SEATNO: ticket.seatno,
    CLASS: ticket.class,
    DATE_OF_CANCELLATION: ticket.date_of_cancellation,
    PID: ticket.pid,
    PASSPORTNO: ticket.passportno
  };

  try {
    await connection.execute(sql, binds, { autoCommit: true });
  } catch (err) {
    console.error('Error inserting ticket:', err);
    throw err; // Propagate error
  }
}

module.exports = {
  insertTicket
};
