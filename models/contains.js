const oracledb = require('oracledb');

async function createContains(airlineId, apName) {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    
    const sql = `
      INSERT INTO CONTAINS (AIRLINEID, AP_NAME)
      VALUES (:airlineId, :apName)
    `;
    await connection.execute(sql, [airlineId, apName]);
    
    await connection.commit();
        
    return { message: "Airline-Airport relationship created successfully." };
  } catch (err) {
    console.error("Error in createContains model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createContains };