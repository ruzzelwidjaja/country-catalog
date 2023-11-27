const express = require('express');
const { generateTravelRecommendations } = require('../../services/gptService');
const router = express.Router();

router.get('/:countryName', async (req, res) => {
    const countryName = req.params.countryName;
    try {
        const recommendations = await generateTravelRecommendations(countryName);
        res.json({ recommendations });
    } catch (error) {
        console.error('Error generating travel recommendations:', error.message);
        res.status(500).json({ message: "Error generating travel recommendations" });
    }
});

module.exports = router;
