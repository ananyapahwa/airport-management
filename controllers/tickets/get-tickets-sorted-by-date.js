const oracledb = require('oracledb');

const getTicketsSortedByDate = async (req, res) => {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    
    const result = await connection.execute(
      `BEGIN
         get_passenger_tickets_sorted(:passportNo, :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );
    
    const resultSet = result.outBinds.cursor;
    const rows = await resultSet.getRows(100); // Get up to 100 rows
    await resultSet.close();
    
    res.json({
      success: true,
      data: rows.map(row => ({
        ticketNumber: row[0],
        source: row[1],
        destination: row[2],
        dateOfBooking: row[3],
        dateOfTravel: row[4],
        seatNo: row[5],
        class: row[6],
        dateOfCancellation: row[7],
        pid: row[8],
        passportNo: row[9],
        firstName: row[10],
        lastName: row[11],
        flightCode: row[12],
        price: row[13]
      }))
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Error retrieving tickets',
      message: err.message
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

// Alternative: Get tickets for a specific passenger
const getTicketsByPassenger = async (req, res) => {
  let connection;
  const { passportNo } = req.params;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `BEGIN 
         get_passenger_tickets_sorted(:p_passportno, :booking_cursor); 
       END;`,
      {
        p_passportno: passportNo.trim(),
        booking_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );

    const resultSet = result.outBinds.booking_cursor;
    const rows = await resultSet.getRows(); // you can pass a limit like getRows(100) if needed
    await resultSet.close();

   
    const formattedData = rows.map(row => ({
      PID: row[0],
      SOURCE: row[1],
      DESTINATION: row[2],
      DATE_OF_BOOKING: row[3],
      DATE_OF_TRAVEL: row[4],
      SEAT_NO: row[5],
      CLASS: row[6],
      MEAL: row[7],
      IS_BOOKED: row[8],
      PASSPORTNO: row[9],
      FNAME: row[10],
      LNAME: row[11],
      FLIGHT_CODE: row[12],
      PRICE: row[13]
    }));

    res.json({
      success: true,
      data: formattedData
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Error retrieving tickets',
      message: err.message
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

module.exports = {
  getTicketsSortedByDate,
  getTicketsByPassenger
};