const oracledb = require('oracledb');
const flightTicketModel = require('../../models/flight_tickets');

// Add new flight ticket
async function addFlightTicket(req, res) {
  const { 
    ticket_number, 
    source, 
    destination, 
    date_of_booking, 
    date_of_travel, 
    seatno, 
    class: ticketClass, 
    date_of_cancellation, 
    pid, 
    passportno 
  } = req.body;

  // Validate required fields
  if (!ticket_number || !source || !destination || !date_of_travel || !seatno || !ticketClass || !pid || !passportno) {
    return res.status(400).json({ 
      error: 'Required fields: ticket_number, source, destination, date_of_travel, seatno, class, pid, passportno' 
    });
  }

  let connection;
  try {
    connection = await oracledb.getConnection();
    
    await flightTicketModel.insertTicket(connection, {
      ticket_number,
      source: source.toUpperCase(),
      destination: destination.toUpperCase(),
      date_of_booking: date_of_booking || new Date(), // Default to current date if not provided
      date_of_travel,
      seatno,
      class: ticketClass,
      date_of_cancellation,
      pid,
      passportno
    });

    res.status(201).json({ message: 'Flight ticket created successfully' });
  } catch (err) {
    console.error('Error in addFlightTicket controller:', err);
    res.status(500).json({ error: 'An error occurred while creating the flight ticket' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Get all flight tickets
async function getAllFlightTickets(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const tickets = await flightTicketModel.getAllTickets(connection);
    
    res.status(200).json(tickets);
  } catch (err) {
    console.error('Error in getAllFlightTickets controller:', err);
    res.status(500).json({ error: 'An error occurred while fetching flight tickets' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Get flight ticket by ticket number
async function getFlightTicketByNumber(req, res) {
  const { ticketNumber } = req.params;
  
  if (!ticketNumber) {
    return res.status(400).json({ error: 'Ticket number is required' });
  }
  
  let connection;
  try {
    connection = await oracledb.getConnection();
    const ticket = await flightTicketModel.getTicketByNumber(connection, ticketNumber);
    
    if (!ticket) {
      return res.status(404).json({ error: 'Flight ticket not found' });
    }
    
    res.status(200).json(ticket);
  } catch (err) {
    console.error('Error in getFlightTicketByNumber controller:', err);
    res.status(500).json({ error: 'An error occurred while fetching the flight ticket' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Get flight tickets by passenger
async function getFlightTicketsByPassenger(req, res) {
  const { pid, passportno } = req.params;
  
  if (!pid || !passportno) {
    return res.status(400).json({ error: 'PID and passport number are required' });
  }
  
  let connection;
  try {
    connection = await oracledb.getConnection();
    const tickets = await flightTicketModel.getTicketsByPassenger(connection, pid, passportno);
    
    res.status(200).json(tickets);
  } catch (err) {
    console.error('Error in getFlightTicketsByPassenger controller:', err);
    res.status(500).json({ error: 'An error occurred while fetching flight tickets' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Delete flight ticket
async function deleteFlightTicket(req, res) {
  const { ticketNumber } = req.params;
  
  if (!ticketNumber) {
    return res.status(400).json({ error: 'Ticket number is required' });
  }
  
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    // Check if ticket exists before deleting
    const ticket = await flightTicketModel.getTicketByNumber(connection, ticketNumber);
    if (!ticket) {
      return res.status(404).json({ error: 'Flight ticket not found' });
    }
    
    await flightTicketModel.deleteTicket(connection, ticketNumber);
    
    res.status(200).json({ message: 'Flight ticket deleted successfully' });
  } catch (err) {
    console.error('Error in deleteFlightTicket controller:', err);
    res.status(500).json({ error: 'An error occurred while deleting the flight ticket' });
  } finally {
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
  addFlightTicket,
  getAllFlightTickets,
  getFlightTicketByNumber,
  getFlightTicketsByPassenger,
  deleteFlightTicket
};
