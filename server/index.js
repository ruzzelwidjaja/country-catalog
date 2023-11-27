require('dotenv').config();
const express = require('express');
const cors = require('cors');
const countryRoutes = require('./api/country/countryRoutes');
const travelRoutes = require('./api/travel/travelRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware Setup
// CORS enables the server to accept requests from different origins.
app.use(cors());

// This middleware is used to parse JSON bodies in requests.
app.use(express.json());

// Root endpoint just to check if the server is running
app.get('/', (req, res) => {
  res.send('Countries Catalog Backend is running');
});

app.use('/country', countryRoutes);
app.use('/travel', travelRoutes);

// Start the Express Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
