const express = require('express');
const oracledb = require('oracledb');
const cityRoutes = require('./routes/city');
const airportRoutes = require('./routes/airport');
const airlineRoutes = require('./routes/airline');
const TicketsRoutes = require('./routes/ticket');
const containsRoutes = require('./routes/contains');
const servesRoutes = require('./routes/serves');
const passengerRoutes = require ('./routes/passenger')
const flightRoutes = require ('./routes/flight')
const employeeDetailRoute = require('./routes/employee_details')
const sqlQueryRoutes = require ('./routes/sql-queries')

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
app.use('/api/city', cityRoutes);
app.use('/api/airport', airportRoutes);
app.use('/api/airline', airlineRoutes);
app.use('/api/ticket',TicketsRoutes);
app.use('/api/contains', containsRoutes);
app.use('/api/serves', servesRoutes);
app.use ('/api/passenger', passengerRoutes)
app.use ('/api/flight', flightRoutes)
app.use('/api/employee', employeeDetailRoute);
app.use('/api/query', sqlQueryRoutes);

// Start the Express server
createPool().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
