const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:name', async (req, res) => {
    const countryName = req.params.name;
    
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching country data:', error.message);
        res.status(500).json({ message: "Error fetching country data" });
    }
});

module.exports = router;
