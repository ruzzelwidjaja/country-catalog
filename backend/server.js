const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
// const cors = require('cors');

// app.use(cors());

app.use(express.json());

// Root endpoint just to check if the server is running
app.get('/', (req, res) => {
  res.send('Countries Catalog Backend is running');
});

// Endpoint to fetch country data from the REST Countries API
app.get('/country/:name', async (req, res) => {
  const countryName = req.params.name;
  
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching country data" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
