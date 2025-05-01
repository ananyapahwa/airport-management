const oracledb = require('oracledb');

async function createPassengerRelationship(pid, passportno) {
  let connection;
  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO PASSENGER_RELATIONSHIP (PID, PASSPORTNO)
      VALUES (:pid, :passportno)
    `;

    await connection.execute(sql, { pid, passportno });
    await connection.commit();

    return { message: "Passenger relationship inserted successfully." };
  } catch (err) {
    console.error("Error in createPassengerRelationship model:", err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { createPassengerRelationship };
