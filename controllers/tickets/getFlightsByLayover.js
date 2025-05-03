const oracledb = require('oracledb');

// Get Layover or Non-Layover Flights
const getFlightsByLayover = async (req, res) => {
  let connection;
  const { layover } = req.params;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `
      DECLARE
        result_cursor SYS_REFCURSOR;
      BEGIN
        GET_FLIGHTS_BY_LAYOVER(:layover, :result_cursor);
      END;
      `,
      {
        layover: layover.toUpperCase(), // 'YES' or 'NO'
        result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    const resultSet = result.outBinds.result_cursor;
    const rows = await resultSet.getRows(); // fetch all
    await resultSet.close();

    // Define column names based on the FLIGHT table
    const columnNames = [
      "FLIGHT_CODE", "SOURCE", "DESTINATION", "ARRIVAL", "DEPARTURE",
      "STATUS", "DURATION", "FLIGHTTYPE", "LAYOVER_TIME", "NO_OF_STOPS", "AIRLINEID"
    ];

    // Convert each row to a structured object
    const structuredData = rows.map(row => {
      const obj = {};
      columnNames.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });

    res.json({
      success: true,
      count: structuredData.length,
      data: structuredData
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching flight data",
      error: err.message
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = {
  getFlightsByLayover
};
