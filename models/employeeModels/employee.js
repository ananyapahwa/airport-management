const oracledb = require('oracledb');

async function createEmployee(
  E_ID,
  F_NAME,
  M_NAME,
  L_NAME,
  SEX,
  SSN,
  ADDRESS,
  CITY,
  STATE,
  COUNTRY,
  PHONE,
  SALARY,
  JOB
) {

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO Employee (E_ID, F_NAME, M_NAME, L_NAME, SEX, SSN, ADDRESS, CITY, STATE, COUNTRY, PHONE, SALARY, JOB)
      VALUES (:E_ID, :F_NAME, :M_NAME, :L_NAME, :SEX, :SSN, :ADDRESS, :CITY, :STATE, :COUNTRY, :PHONE, :SALARY, :JOB)
    `;

    const binds = {
      E_ID,
      F_NAME,
      M_NAME,
      L_NAME,
      SEX,
      SSN,
      ADDRESS,
      CITY,
      STATE,
      COUNTRY,
      PHONE,
      SALARY,
      JOB
    };

    await connection.execute(sql, binds, { autoCommit: true });

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

module.exports = {
  createEmployee
};
