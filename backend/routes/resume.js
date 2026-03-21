const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

// @route   POST api/resume/analyze
// @desc    Analyze resume text and suggest learning paths
// @access  Private
router.post('/analyze', auth, async (req, res) => {
    const { resumeText, targetRole } = req.body;

    if (!resumeText || !targetRole) {
        return res.status(400).json({ msg: 'Resume text and target role are required' });
    }

    try {
        const user = await User.findById(req.user.id);
        
        // Monetization logic
        if (user && !user.isPro) {
            if (user.credits <= 0) {
                 return res.status(403).json({ msg: 'Not enough credits for Resume Analysis. Upgrade to Pro.' });
            }
            user.credits -= 1;
            await user.save();
        }

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `You are an expert career coach and technical recruiter.
        
        Target Role: ${targetRole}
        
        Candidate's Resume:
        """
        ${resumeText}
        """

        Analyze the resume against the target role and provide a structured JSON response (do not use markdown blocks, return ONLY valid JSON).
        The JSON should have the following structure:
        {
            "matchPercentage": 75,
            "strengths": ["React", "JavaScript", "Problem Solving"],
            "missingSkills": ["Node.js", "Docker", "System Design"],
            "recommendedRoadmaps": [
                { "title": "Advanced Node.js & Express", "reason": "Required for backend roles mentioned in target." },
                { "title": "Docker for Beginners", "reason": "Standard industry deployment practice." }
            ],
            "feedback": "Your frontend skills are strong, but you need more backend and DevOps exposure for this full-stack role."
        }`;

        const result = await model.generateContent(prompt);
        // Clean markdown JSON wrapper if exists
        let text = result.response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const analysis = JSON.parse(text);

        res.json(analysis);
    } catch (err) {
        console.error("Resume Analyzer Error:", err.message);
        res.status(500).send('Analysis failed or returned invalid format.');
    }
});

module.exports = router;
