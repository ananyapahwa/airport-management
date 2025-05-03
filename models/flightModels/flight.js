const oracledb = require('oracledb');

async function createFlight(flight_number, departure_time, arrival_time, departure_city, arrival_city, aircraft_id) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO FLIGHT (FLIGHT_NUMBER, DEPARTURE_TIME, ARRIVAL_TIME, DEPARTURE_CITY, ARRIVAL_CITY, AIRCRAFT_ID)
      VALUES (:flight_number, :departure_time, :arrival_time, :departure_city, :arrival_city, :aircraft_id)
    `;
    await connection.execute(sql, [flight_number, departure_time, arrival_time, departure_city, arrival_city, aircraft_id]);

    await connection.commit();
    
    return { message: "Flight inserted successfully." };
  } catch (err) {
    console.error("Error in createFlight model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createFlight }; 