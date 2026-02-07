const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Resource = require('../models/Resource');
const axios = require('axios');

// @route   GET api/resources
// @desc    Get all resources with optional filtering
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { type, difficulty, search } = req.query;
        let query = {};

        if (type) query.type = type;
        if (difficulty) query.difficulty = difficulty;
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const resources = await Resource.find(query);
        res.json(resources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/resources/recommend
// @desc    Get recommendations from ML service
// @access  Private
router.post('/recommend', auth, async (req, res) => {
    try {
        const { topic } = req.body;

        // Call ML Service
        const response = await axios.post('http://localhost:8000/ml/recommend', {
            topic
        });

        // In a real app, we might use the returned IDs to fetch actual resource objects from DB
        // For now, we'll return what the ML service returns, effectively proxying
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        // Fallback or error handling
        res.status(500).send('ML Service Error');
    }
});

module.exports = router;
