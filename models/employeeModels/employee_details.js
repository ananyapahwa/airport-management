const oracledb = require('oracledb');

async function createEmployeeDetails(
  SSN,
  FNAME,
  M,
  LNAME,
  ADDRESS,
  PHONE,
  AGE,
  SEX,
  JOBTYPE,
  ASTYPE,
  ETYPE,
  SHIFT,
  POSITION,
  AP_NAME
) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_DETAILS (SSN, FNAME, M, LNAME, ADDRESS, PHONE, AGE, SEX, JOBTYPE, ASTYPE, ETYPE, SHIFT, POSITION, AP_NAME)
      VALUES (:SSN, :FNAME, :M, :LNAME, :ADDRESS, :PHONE, :AGE, :SEX, :JOBTYPE, :ASTYPE, :ETYPE, :SHIFT, :POSITION, :AP_NAME)
    `;

    const binds = {
      SSN,
      FNAME,
      M,
      LNAME,
      ADDRESS,
      PHONE,
      AGE,
      SEX,
      JOBTYPE,
      ASTYPE,
      ETYPE,
      SHIFT,
      POSITION,
      AP_NAME
    };

    await connection.execute(sql, binds, { autoCommit: true });

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

module.exports = {
  createEmployeeDetails
};
