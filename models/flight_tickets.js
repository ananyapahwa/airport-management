// models/flightTickets.js

module.exports = {
    insertTicket: async (connection, ticket) => {
      const sql = `
        INSERT INTO FLIGHT_TICKETS (
          TICKET_NUMBER, SOURCE, DESTINATION, DATE_OF_BOOKING, 
          DATE_OF_TRAVEL, SEATNO, CLASS, DATE_OF_CANCELLATION,
          PID, PASSPORTNO
        ) VALUES (
          :TICKET_NUMBER, :SOURCE, :DESTINATION, :DATE_OF_BOOKING,
          :DATE_OF_TRAVEL, :SEATNO, :CLASS, :DATE_OF_CANCELLATION,
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
  
      await connection.execute(sql, binds, { autoCommit: true });
    },
  
    getAllTickets: async (connection) => {
      const result = await connection.execute(
        `SELECT * FROM FLIGHT_TICKETS ORDER BY DATE_OF_TRAVEL`
      );
      return result.rows;
    },
  
    getTicketByNumber: async (connection, ticketNumber) => {
      const result = await connection.execute(
        `SELECT * FROM FLIGHT_TICKETS WHERE TICKET_NUMBER = :ticketNumber`,
        { ticketNumber }
      );
      return result.rows[0]; // Return the first (and should be only) result
    },
  
    getTicketsByPassenger: async (connection, pid, passportno) => {
      const result = await connection.execute(
        `SELECT * FROM FLIGHT_TICKETS 
         WHERE PID = :pid AND PASSPORTNO = :passportno
         ORDER BY DATE_OF_TRAVEL`,
        { pid, passportno }
      );
      return result.rows;
    },
  
    deleteTicket: async (connection, ticketNumber) => {
      await connection.execute(
        `DELETE FROM FLIGHT_TICKETS WHERE TICKET_NUMBER = :ticketNumber`,
        { ticketNumber },
        { autoCommit: true }
      );
    }
  };
  