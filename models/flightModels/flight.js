const oracledb = require('oracledb');

async function createFlight({
  FLIGHT_CODE,
  SOURCE,
  DESTINATION,
  ARRIVAL,
  DEPARTURE,
  STATUS,
  DURATION,
  FLIGHTTYPE,
  LAYOVER_TIME,
  NO_OF_STOPS,
  AIRLINEID
}) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO FLIGHT (
        FLIGHT_CODE, SOURCE, DESTINATION, ARRIVAL, DEPARTURE,
        STATUS, DURATION, FLIGHTTYPE, LAYOVER_TIME, NO_OF_STOPS, AIRLINEID
      ) VALUES (
        :FLIGHT_CODE, :SOURCE, :DESTINATION, :ARRIVAL, :DEPARTURE,
        :STATUS, :DURATION, :FLIGHTTYPE, :LAYOVER_TIME, :NO_OF_STOPS, :AIRLINEID
      )
    `;

    const binds = {
      FLIGHT_CODE,
      SOURCE,
      DESTINATION,
      ARRIVAL,
      DEPARTURE,
      STATUS,
      DURATION,
      FLIGHTTYPE,
      LAYOVER_TIME,
      NO_OF_STOPS,
      AIRLINEID
    };

    await connection.execute(sql, binds, { autoCommit: true });

    return { message: "Flight inserted successfully." };
  } catch (err) {
    console.error("Error in insertFlight model:", err);
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

async function getAllFlightsForAnAirline(airline_id) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      SELECT * FROM FLIGHT
      WHERE AIRLINE_ID = :airline_id
    `;

    const result = await connection.execute(sql, [airline_id]);

    return result.rows;
  } catch (err) {
    console.error("Error in getAllFlightsForAnAirline model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createFlight, getFlight, getAllFlightsForAnAirline };
