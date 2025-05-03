const oracledb = require('oracledb');

async function createEmployee(e_id, f_name, m_name, l_name, sex, ssn, address, city, state, country, phone, salary, job) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO Employee (E_ID, F_NAME, M_NAME, L_NAME, SEX, SSN, ADDRESS, CITY, STATE, COUNTRY, PHONE, SALARY, JOB)
      VALUES (:e_id, :f_name, :m_name, :l_name, :sex, :ssn, :address, :city, :state, :country, :phone, :salary, :job)
    `;

    await connection.execute(sql, [e_id, f_name, m_name, l_name, sex, ssn, address, city, state, country, phone, salary, job]);
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

async function getAllEmployees() {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM Employee ORDER BY E_ID`
    );

    return result.rows;
  } catch (err) {
    console.error("Error in getAllEmployees model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function getEmployeeById(e_id) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `SELECT * FROM Employee WHERE E_ID = :e_id`,
      [e_id]
    );

    return result.rows[0]; // Return the first (and should be only) result
  } catch (err) {
    console.error("Error in getEmployeeById model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function updateEmployee(e_id, updateData) {
  let connection;

  try {
    connection = await oracledb.getConnection();
    
    // Build the SET clause dynamically based on provided fields
    const setClause = Object.keys(updateData)
      .map(key => `${key.toUpperCase()} = :${key}`)
      .join(', ');
    
    const sql = `UPDATE Employee SET ${setClause} WHERE E_ID = :e_id`;
    
    // Add e_id to the bind variables
    const bindVars = { ...updateData, e_id };
    
    await connection.execute(sql, bindVars);
    await connection.commit();

    return { message: "Employee updated successfully." };
  } catch (err) {
    console.error("Error in updateEmployee model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function deleteEmployee(e_id) {
  let connection;

  try {
    connection = await oracledb.getConnection();

    await connection.execute(
      `DELETE FROM Employee WHERE E_ID = :e_id`,
      [e_id]
    );
    await connection.commit();

    return { message: "Employee deleted successfully." };
  } catch (err) {
    console.error("Error in deleteEmployee model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
