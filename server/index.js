require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { generateTravelRecommendations } = require('./gptService');

const app = express();
const port = process.env.PORT || 3001;


// Middleware Setup
// CORS enables your server to accept requests from different origins.
app.use(cors());

// This middleware is used to parse JSON bodies in requests.
app.use(express.json());

// Root endpoint just to check if the server is running
app.get('/', (req, res) => {
  res.send('Countries Catalog Backend is running');
});

/**
 * Country Data Endpoint
 * GET /country/:name
 * Fetches data for a specific country from the REST Countries API.
 */
app.get('/country/:name', async (req, res) => {
  const countryName = req.params.name;
  
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    res.status(500).json({ message: "Error fetching country data" });
  }
});

// GPT API Route
app.get('/travel/:countryName', async (req, res) => {
  const countryName = req.params.countryName;
  try {
    const recommendations = await generateTravelRecommendations(countryName);
    res.json({ recommendations });
  } catch (error) {
    console.error('Error generating travel recommendations:', error.message);
    res.status(500).json({ message: "Error generating travel recommendations" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;