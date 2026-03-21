const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

// @route   POST api/interview
// @desc    Conduct an AI Mock Interview based on a topic
// @access  Private
router.post('/', auth, async (req, res) => {
    const { topic, history, message } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        
        // Premium feature check (allow 1 free then block if not pro)
        if (!user.isPro) {
            // we could strictly enforce this, for demo let's allow it but maybe deduct a credit
            if (user.credits <= 0) {
                 return res.status(403).json({ msg: 'Requires Premium Plan or Credits.' });
            }
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `You are an expert technical interviewer conducting a mock interview on the topic: "${topic}".
        
        Previous conversation context:
        ${history.map(h => `${h.role === 'user' ? 'Candidate' : 'Interviewer'}: ${h.message}`).join('\n')}
        
        Candidate's latest input: "${message}"

        Instructions:
        1. If this is the start of the interview (Candidate input is empty or says "start"), welcome them briefly and ask the first technical question about ${topic}.
        2. If the candidate answered a question, briefly evaluate their answer (correct, partially correct, incorrect) and provide constructive feedback.
        3. After evaluating, ask the next technical question that gets progressively harder.
        4. Keep your responses concise and conversational (like a real interview, don't write huge paragraphs).
        5. Ask exactly ONE question at a time.
        
        Your response:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (err) {
        console.error("Interview API Error:", err.message);
        res.status(500).send('Interview Service Error');
    }
});

module.exports = router;
