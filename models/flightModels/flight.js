const oracledb = require('oracledb');

async function insertFlight({
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

module.exports = { insertFlight };
