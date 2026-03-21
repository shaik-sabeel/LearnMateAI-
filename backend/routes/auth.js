const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Daily Streak Logic
        const today = new Date();
        const todayStr = today.toDateString();
        const lastLoginStr = user.lastLogin ? new Date(user.lastLogin).toDateString() : null;

        if (lastLoginStr !== todayStr) {
            if (user.lastLogin) {
                // Calculate difference in days (UTC midnight to midnight is safer, but basic math works for now)
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                
                if (yesterday.toDateString() === lastLoginStr) {
                    user.streak += 1;
                } else {
                    user.streak = 1;
                }
            } else {
                user.streak = 1;
            }
            user.lastLogin = today;
            await user.save();
        }


        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/user
// @desc    Get logged in user
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/onboard
// @desc    Complete user onboarding
// @access  Private
router.post('/onboard', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        
        user.onboardingCompleted = true;
        await user.save();

        res.json({ msg: 'Onboarding completed', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/users/top
// @desc    Get top users for leaderboard
// @access  Public
router.get('/users/top', async (req, res) => {
    try {
        const users = await User.find().sort({ xp: -1 }).limit(10).select('name level badges xp streak');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('name level badges xp streak createdAt');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
