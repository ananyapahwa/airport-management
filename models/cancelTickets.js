const oracledb = require('oracledb');

async function createCancellation(dateOfCancellation, surcharge) {
  let connection;
  
  try {
    connection = await oracledb.getConnection();
    
    const sql = `
      INSERT INTO CANCEL_TICKETS (DATE_OF_CANCELLATION, SURCHARGE)
      VALUES (:dateOfCancellation, :surcharge)
    `;
    await connection.execute(sql, [dateOfCancellation, surcharge]);
    
    await connection.commit();
        
    return { message: "Cancellation record inserted successfully." };
  } catch (err) {
    console.error("Error in createCancellation model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createCancellation };