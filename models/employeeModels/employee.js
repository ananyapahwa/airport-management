const oracledb = require('oracledb');

async function createEmployee(ssn, fname, lname, address, phone, email, position) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE (SSN, FNAME, LNAME, ADDRESS, PHONE, EMAIL, POSITION)
      VALUES (:ssn, :fname, :lname, :address, :phone, :email, :position)
    `;
    await connection.execute(sql, [ssn, fname, lname, address, phone, email, position]);

    await connection.commit();
    
    return { message: "Employee inserted successfully." };
  } catch (err) {
    console.error("Error in createEmployee model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createEmployee }; 