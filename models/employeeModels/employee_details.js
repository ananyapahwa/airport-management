const oracledb = require('oracledb');

async function createEmployeeDetails(ssn, join_date, department, supervisor_ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_DETAILS (SSN, JOIN_DATE, DEPARTMENT, SUPERVISOR_SSN)
      VALUES (:ssn, :join_date, :department, :supervisor_ssn)
    `;
    await connection.execute(sql, [ssn, join_date, department, supervisor_ssn]);

    await connection.commit();
    
    return { message: "Employee details inserted successfully." };
  } catch (err) {
    console.error("Error in createEmployeeDetails model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createEmployeeDetails }; 