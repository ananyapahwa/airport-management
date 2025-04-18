const oracledb = require('oracledb');

// Function to insert a new user into the users table
async function createUser(username, email) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    
    // SQL query to insert a new user
    const sql = `INSERT INTO users (username, email) VALUES (:username, :email)`;
    const binds = [username, email];

    // Execute the query
    const result = await connection.execute(sql, binds, { autoCommit: true });

    return result.lastRowid; // Return the inserted user's ID
  } catch (err) {
    console.error("Error inserting user:", err);
    throw err; // Rethrow error to handle it in the controller
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

module.exports = { createUser };
