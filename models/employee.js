const oracledb = require('oracledb');

// Basic employee information
async function createEmployee(ssn, fname, lname, address, phone, email, role) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE (SSN, FNAME, LNAME, ADDRESS, PHONE, EMAIL, ROLE)
      VALUES (:ssn, :fname, :lname, :address, :phone, :email, :role)
    `;
    await connection.execute(sql, [ssn, fname, lname, address, phone, email, role]);

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

async function getEmployee(ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      SELECT * FROM EMPLOYEE
      WHERE SSN = :ssn
    `;
    const result = await connection.execute(sql, [ssn]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error in getEmployee model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Employee details
async function createEmployeeDetails(ssn, join_date, department, position, supervisor_ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_DETAILS (SSN, JOIN_DATE, DEPARTMENT, POSITION, SUPERVISOR_SSN)
      VALUES (:ssn, :join_date, :department, :position, :supervisor_ssn)
    `;
    await connection.execute(sql, [ssn, join_date, department, position, supervisor_ssn]);

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

async function getEmployeeDetails(ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      SELECT * FROM EMPLOYEE_DETAILS
      WHERE SSN = :ssn
    `;
    const result = await connection.execute(sql, [ssn]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error in getEmployeeDetails model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Employee salary
async function createEmployeeSalary(ssn, salary, bonus, tax_deductions) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_SALARY (SSN, SALARY, BONUS, TAX_DEDUCTIONS)
      VALUES (:ssn, :salary, :bonus, :tax_deductions)
    `;
    await connection.execute(sql, [ssn, salary, bonus, tax_deductions]);

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

async function getEmployeeSalary(ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      SELECT * FROM EMPLOYEE_SALARY
      WHERE SSN = :ssn
    `;
    const result = await connection.execute(sql, [ssn]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error in getEmployeeSalary model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Get complete employee information
async function getCompleteEmployeeInfo(ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      SELECT e.*, ed.JOIN_DATE, ed.DEPARTMENT, ed.POSITION, ed.SUPERVISOR_SSN,
             es.SALARY, es.BONUS, es.TAX_DEDUCTIONS
      FROM EMPLOYEE e
      LEFT JOIN EMPLOYEE_DETAILS ed ON e.SSN = ed.SSN
      LEFT JOIN EMPLOYEE_SALARY es ON e.SSN = es.SSN
      WHERE e.SSN = :ssn
    `;
    const result = await connection.execute(sql, [ssn]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error in getCompleteEmployeeInfo model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createEmployee,
  getEmployee,
  createEmployeeDetails,
  getEmployeeDetails,
  createEmployeeSalary,
  getEmployeeSalary,
  getCompleteEmployeeInfo
}; 