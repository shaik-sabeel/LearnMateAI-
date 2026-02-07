const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const QuizResult = require('../models/QuizResult');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

// @route   POST api/quiz/generate
// @desc    Generate a quiz using Gemini
// @access  Private
router.post('/generate', auth, async (req, res) => {
    const { topic, difficulty } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Generate a JSON object with 5 multiple choice questions on the topic "${topic}" at ${difficulty} level.
        Each question should have: question, options (array of 4 strings), and answer (the correct option string).
        Format: [{ "question": "...", "options": ["..."], "answer": "..." }]
        Ensure strict JSON format, no markdown.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim(); // Cleanup markdown

        const quiz = JSON.parse(text);
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error generating quiz');
    }
});

// @route   POST api/quiz/save
// @desc    Save quiz result
// @access  Private
router.post('/save', auth, async (req, res) => {
    const { topic, score, totalQuestions } = req.body;

    try {
        const newResult = new QuizResult({
            user: req.user.id,
            topic,
            score,
            totalQuestions
        });

        await newResult.save();
        res.json(newResult);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/quiz/predict-gap
// @desc    Predict learning gap
// @access  Private
router.post('/predict-gap', auth, async (req, res) => {
    try {
        const { quiz_score, total_questions } = req.body;
        const response = await axios.post('http://localhost:8000/ml/predict-gap', {
            quiz_score,
            total_questions
        });
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ML Service Error');
    }
});

module.exports = router;
