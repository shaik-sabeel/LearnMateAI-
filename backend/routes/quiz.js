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
        console.log(">>> USING MODEL: gemini-flash-latest (Final Attempt) <<<");
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Generate exactly 5 multiple-choice questions on the topic "${topic}" at "${difficulty}" level.
        Return ONLY a JSON object with a "quiz" key containing an array of questions.
        Format:
        {
          "quiz": [
            {
              "question": "Question text here?",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "answer": "Correct Option Text (must match one of the options exactly)"
            }
          ]
        }
        Do not include any markdown formatting (like \`\`\`json). Return raw JSON only.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

        // Cleanup potential markdown if Gemini adds it anyway
        if (text.startsWith('```json')) {
            text = text.replace(/^```json/, '').replace(/```$/, '').trim();
        } else if (text.startsWith('```')) {
            text = text.replace(/^```/, '').replace(/```$/, '').trim();
        }

        const data = JSON.parse(text);

        // Ensure we send back the array
        if (data.quiz && Array.isArray(data.quiz)) {
            res.json({ quiz: data.quiz });
        } else if (Array.isArray(data)) {
            res.json({ quiz: data });
        } else {
            throw new Error('Invalid quiz format received from AI');
        }
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

// @route   POST api/quiz/submit
// @desc    Submit quiz, calculate score, and save result
// @access  Private
router.post('/submit', auth, async (req, res) => {
    const { topic, difficulty, questions, userAnswers } = req.body;

    if (!questions || !userAnswers || questions.length !== userAnswers.length) {
        return res.status(400).json({ msg: 'Invalid submission data' });
    }

    try {
        let score = 0;
        questions.forEach((q, index) => {
            if (q.answer === userAnswers[index]) {
                score++;
            }
        });

        const newResult = new QuizResult({
            user: req.user.id,
            topic,
            difficulty,
            questions,
            userAnswers,
            score,
            totalQuestions: questions.length
        });

        await newResult.save();

        res.json({
            score,
            total: questions.length,
            message: 'Quiz submitted successfully',
            resultId: newResult._id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
