const oracledb = require('oracledb');

async function createEmployeeSalary(ssn, salary, bonus, tax_percentage) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_SALARY (SSN, SALARY, BONUS, TAX_PERCENTAGE)
      VALUES (:ssn, :salary, :bonus, :tax_percentage)
    `;
    await connection.execute(sql, [ssn, salary, bonus, tax_percentage]);

    await connection.commit();
    
    return { message: "Employee salary inserted successfully." };
  } catch (err) {
    console.error("Error in createEmployeeSalary model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createEmployeeSalary }; 