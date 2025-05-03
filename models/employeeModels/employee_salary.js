const oracledb = require('oracledb');

async function createEmployeeSalary(jobtype, salary) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_SALARY (JOBTYPE, SALARY)
      VALUES (:jobtype, :salary)
    `;

    await connection.execute(sql, [jobtype, salary]);
    await connection.commit();

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

async function getAllEmployeeSalaries() {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM EMPLOYEE_SALARY ORDER BY JOBTYPE`
    );

    return result.rows;
  } catch (err) {
    console.error("Error in getAllEmployeeSalaries model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getEmployeeSalaryByJobType(jobtype) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM EMPLOYEE_SALARY WHERE JOBTYPE = :jobtype`,
      [jobtype]
    );

    return result.rows[0]; // Return the first (and should be only) result
  } catch (err) {
    console.error("Error in getEmployeeSalaryByJobType model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function updateEmployeeSalary(jobtype, salary) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      UPDATE EMPLOYEE_SALARY 
      SET SALARY = :salary 
      WHERE JOBTYPE = :jobtype
    `;

    await connection.execute(sql, [salary, jobtype]);
    await connection.commit();

    return { message: "Employee salary updated successfully." };
  } catch (err) {
    console.error("Error in updateEmployeeSalary model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deleteEmployeeSalary(jobtype) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    await connection.execute(
      `DELETE FROM EMPLOYEE_SALARY WHERE JOBTYPE = :jobtype`,
      [jobtype]
    );
    await connection.commit();

    return { message: "Employee salary record deleted successfully." };
  } catch (err) {
    console.error("Error in deleteEmployeeSalary model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createEmployeeSalary,
  getAllEmployeeSalaries,
  getEmployeeSalaryByJobType,
  updateEmployeeSalary,
  deleteEmployeeSalary
};
