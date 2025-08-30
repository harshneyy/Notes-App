// routes/notes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Note = require('../models/Note');

// @route   GET /api/notes
// @desc    Get all of a user's notes
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        // req.user.id is available because of our authMiddleware
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newNote = new Note({
            title,
            content,
            user: req.user.id,
        });

        const note = await newNote.save();
        res.status(201).json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });

        // Make sure user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content } },
            { new: true } // This option returns the document after it's been updated
        );

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });

        // Make sure user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Note removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;