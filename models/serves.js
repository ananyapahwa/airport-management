const oracledb = require('oracledb');

async function createServes(ssn, pid, passportNo) {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    
    const sql = `
      INSERT INTO SERVES (SSN, PID, PASSPORTNO)
      VALUES (:ssn, :pid, :passportNo)
    `;
    await connection.execute(sql, [ssn, pid, passportNo]);
    
    await connection.commit();
        
    return { message: "Employee-Passenger service record created successfully." };
  } catch (err) {
    console.error("Error in createServes model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createServes };