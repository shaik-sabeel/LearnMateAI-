const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Video', 'Article', 'Documentation'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: [String]
});

module.exports = mongoose.model('Resource', ResourceSchema);
