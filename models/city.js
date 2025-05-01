const oracledb = require('oracledb');

async function createCity(cname, state, country) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO CITY (CNAME, STATE, COUNTRY)
      VALUES (:cname, :state, :country)
    `;
    await connection.execute(sql, [cname, state, country]);


    await connection.commit();
    
    return { message: "City inserted successfully." };
  } catch (err) {
    console.error("Error in createCity model:", err);
    throw err; 
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createCity };
