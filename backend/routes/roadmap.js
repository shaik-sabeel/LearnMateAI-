const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const axios = require('axios');
const User = require('../models/User');

// @route   POST api/roadmap
// @desc    Generate a learning roadmap
// @access  Private
router.post('/', auth, async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ msg: 'Topic is required' });
    }

    try {
        // Fetch User to check credits
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (!user.isPro && user.credits <= 0) {
            return res.status(403).json({ msg: 'Not enough credits. Please upgrade to Pro.' });
        }

        // Call ML Service
        const response = await axios.post('http://localhost:8000/ml/roadmap', {
            topic
        });



        // Deduct credit if not pro
        if (!user.isPro) {
            user.credits -= 1;
            await user.save();
        }

        res.json(response.data);
    } catch (err) {
        console.error("Roadmap API Error:", err.message);
        res.status(500).send('ML Service Error');
    }
});

module.exports = router;
