const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const axios = require('axios');

// @route   POST api/roadmap
// @desc    Generate a learning roadmap
// @access  Private
router.post('/', auth, async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ msg: 'Topic is required' });
    }

    try {
        // Call ML Service
        const response = await axios.post('http://localhost:8000/ml/roadmap', {
            topic
        });

        res.json(response.data);
    } catch (err) {
        console.error("Roadmap API Error:", err.message);
        res.status(500).send('ML Service Error');
    }
});

module.exports = router;
