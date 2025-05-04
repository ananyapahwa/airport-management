const oracledb = require('oracledb');

async function createAirline(airlineId, alName, threeDigitCode) {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    
    const sql = `
      INSERT INTO AIRLINE (AIRLINEID, AL_NAME, THREE_DIGIT_CODE)
      VALUES (:airlineId, :alName, :threeDigitCode)
    `;
    await connection.execute(sql, [airlineId, alName, threeDigitCode]);
    
    await connection.commit();
        
    return { message: "Airline inserted successfully." };
  } catch (err) {
    console.error("Error in createAirline model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getAllAirlines() {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    
    const sql = `
      SELECT * FROM AIRLINE
    `;
    
    const result = await connection.execute(sql);
    
    return result.rows;
  } catch (err) {
    console.error("Error in getAllAirlines model:", err);
    throw err;
  } finally {
    if (connection) { 
      await connection.close();
    }
  }
}

module.exports = { createAirline, getAllAirlines };

