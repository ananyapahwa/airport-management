const oracledb = require('oracledb');

async function createEmployeeSalary(
  JOBTYPE,
  SALARY
) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_SALARY (JOBTYPE, SALARY)
      VALUES (:JOBTYPE, :SALARY)
    `;

    const binds = {
      JOBTYPE,
      SALARY
    };

    await connection.execute(sql, binds, { autoCommit: true });

    return { message: "Employee salary record inserted successfully." };
  } catch (err) {
    console.error("Error in createEmployeeSalary model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createEmployeeSalary
};
