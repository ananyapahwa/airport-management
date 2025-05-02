const express = require('express');
const cors = require('cors');
const cityRoutes = require('./routes/city');
const employeeRoutes = require('./routes/employee');
const flightRoutes = require('./routes/flight');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', cityRoutes);
app.use('/api', employeeRoutes);
app.use('/api', flightRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
