// models/Note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This creates the connection to our User model
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Note', NoteSchema);