const oracledb = require('oracledb');

async function createFlight(flight_id, airline_id, departure_airport, arrival_airport, departure_time, arrival_time, status) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO FLIGHT (FLIGHT_ID, AIRLINE_ID, DEPARTURE_AIRPORT, ARRIVAL_AIRPORT, DEPARTURE_TIME, ARRIVAL_TIME, STATUS)
      VALUES (:flight_id, :airline_id, :departure_airport, :arrival_airport, :departure_time, :arrival_time, :status)
    `;
    await connection.execute(sql, [flight_id, airline_id, departure_airport, arrival_airport, departure_time, arrival_time, status]);

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

async function getFlight(flight_id) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      SELECT * FROM FLIGHT
      WHERE FLIGHT_ID = :flight_id
    `;
    const result = await connection.execute(sql, [flight_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error in getFlight model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createFlight, getFlight }; 