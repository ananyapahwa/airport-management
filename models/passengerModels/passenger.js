const oracledb = require('oracledb');

async function createPassenger(passengerData) {
  let connection;

  const {
    passportno,
    fname,
    m,
    lname,
    address,
    phone,
    age,
    sex,
  } = passengerData;

  try {
    connection = await oracledb.getConnection();

    const sql = `
      INSERT INTO PASSENGER2 (PASSPORTNO, FNAME, M, LNAME, ADDRESS, PHONE, AGE, SEX)
      VALUES (:passportno, :fname, :m, :lname, :address, :phone, :age, :sex)
    `;

    await connection.execute(sql, {
      passportno,
      fname,
      m,
      lname,
      address,
      phone,
      age,
      sex,
    });

    await connection.commit();

    return { message: "Passenger inserted successfully." };
  } catch (err) {
    console.error("Error in createPassenger model:", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createPassenger };
