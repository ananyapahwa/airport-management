const express = require('express');
const oracledb = require('oracledb');
const userRoutes = require('./routes/user');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Oracle DB connection pool
async function createPool() {
  try {
    await oracledb.createPool({
      user: "system",
      password: "oracle",
      connectString: "localhost:1521/XEPDB1"
    });
    console.log("Oracle DB connection pool created successfully!"); // Success message when pool is created
  } catch (err) {
    console.error("Error creating connection pool:", err);
    process.exit(1); // Exit if connection pool cannot be created
  }
}

// Use the user routes
app.use('/api', userRoutes);

// Start the Express server
createPool().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
