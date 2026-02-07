const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ChatHistory = require('../models/ChatHistory');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

// @route   POST api/chat
// @desc    Chat with AI Tutor
// @access  Private
router.post('/', auth, async (req, res) => {
    const { message } = req.body;

    try {
        // Save User Message
        const userChat = new ChatHistory({
            user: req.user.id,
            role: 'user',
            message
        });
        await userChat.save();

        // Call Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Construct prompt with context
        const prompt = `You are an expert technical tutor. helping a student. 
        User asks: ${message}
        Provide a helpful, educational response.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Save AI Response
        const aiChat = new ChatHistory({
            user: req.user.id,
            role: 'model',
            message: text
        });
        await aiChat.save();

        res.json({ response: text });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/chat/history
// @desc    Get chat history
// @access  Private
router.get('/history', auth, async (req, res) => {
    try {
        const history = await ChatHistory.find({ user: req.user.id }).sort({ timestamp: 1 });
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
