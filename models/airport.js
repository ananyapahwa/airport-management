const oracledb = require('oracledb');

async function createAirport(ap_name, state, country, cname) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO AIRPORT (AP_NAME, STATE, COUNTRY, CNAME)
      VALUES (:ap_name, :state, :country, :cname)
    `;

    await connection.execute(sql, [ap_name, state, country, cname]);
    await connection.commit();

    return { message: "Airport inserted successfully." };
  } catch (err) {
    console.error("Error in createAirport model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createAirport };
