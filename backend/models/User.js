const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    badges: [{
        title: String,
        icon: String,
        dateEarned: {
            type: Date,
            default: Date.now
        }
    }],
    credits: {
        type: Number,
        default: 5
    },
    streak: {
        type: Number,
        default: 0
    },
    lastLogin: {
        type: Date,
        default: null
    },
    isPro: {
        type: Boolean,
        default: false
    },
    onboardingCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);
