const oracledb = require('oracledb');

async function createPassengerBooking(pid, flight_code) {
  let connection;
  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO PASSENGER_BOOKINGS (PID, FLIGHT_CODE)
      VALUES (:pid, :flight_code)
    `;

    await connection.execute(sql, { pid, flight_code });
    await connection.commit();

    return { message: "Passenger booking inserted successfully." };
  } catch (err) {
    console.error("Error in createPassengerBooking model:", err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { createPassengerBooking };
