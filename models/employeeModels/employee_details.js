const oracledb = require('oracledb');

async function createEmployeeDetails(ssn, fname, m, lname, address, phone, age, sex, jobtype, astype, etype, shift, position, ap_name) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO EMPLOYEE_DETAILS (SSN, FNAME, M, LNAME, ADDRESS, PHONE, AGE, SEX, JOBTYPE, ASTYPE, ETYPE, SHIFT, POSITION, AP_NAME)
      VALUES (:ssn, :fname, :m, :lname, :address, :phone, :age, :sex, :jobtype, :astype, :etype, :shift, :position, :ap_name)
    `;

    await connection.execute(sql, [ssn, fname, m, lname, address, phone, age, sex, jobtype, astype, etype, shift, position, ap_name]);
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

async function getAllEmployeeDetails() {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM EMPLOYEE_DETAILS ORDER BY SSN`
    );

    return result.rows;
  } catch (err) {
    console.error("Error in getAllEmployeeDetails model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getEmployeeDetailsBySsn(ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM EMPLOYEE_DETAILS WHERE SSN = :ssn`,
      [ssn]
    );

    return result.rows[0]; // Return the first (and should be only) result
  } catch (err) {
    console.error("Error in getEmployeeDetailsBySsn model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getEmployeeDetailsByAirport(ap_name) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM EMPLOYEE_DETAILS WHERE AP_NAME = :ap_name ORDER BY SSN`,
      [ap_name]
    );

    return result.rows;
  } catch (err) {
    console.error("Error in getEmployeeDetailsByAirport model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function updateEmployeeDetails(ssn, updateData) {
  let connection;

  try {
    connection = await oracledb.getConnection();
    
    // Build the SET clause dynamically based on provided fields
    const setClause = Object.keys(updateData)
      .map(key => `${key.toUpperCase()} = :${key}`)
      .join(', ');
    
    const sql = `UPDATE EMPLOYEE_DETAILS SET ${setClause} WHERE SSN = :ssn`;
    
    // Add ssn to the bind variables
    const bindVars = { ...updateData, ssn };
    
    await connection.execute(sql, bindVars);
    await connection.commit();

    return { message: "Employee details updated successfully." };
  } catch (err) {
    console.error("Error in updateEmployeeDetails model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deleteEmployeeDetails(ssn) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    await connection.execute(
      `DELETE FROM EMPLOYEE_DETAILS WHERE SSN = :ssn`,
      [ssn]
    );
    await connection.commit();

    return { message: "Employee details deleted successfully." };
  } catch (err) {
    console.error("Error in deleteEmployeeDetails model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createEmployeeDetails,
  getAllEmployeeDetails,
  getEmployeeDetailsBySsn,
  getEmployeeDetailsByAirport,
  updateEmployeeDetails,
  deleteEmployeeDetails
};
