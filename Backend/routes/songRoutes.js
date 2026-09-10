const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { protect } = require('../middleware/authMiddleware');

// Get all songs for the logged-in creator
router.get('/', protect, async (req, res) => {
  try {
    const songs = await Song.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new empty song project
router.post('/', protect, async (req, res) => {
  try {
    const song = await Song.create({
      user: req.user.id,
      title: req.body.title || 'Untitled Track',
      sections: [] // Starts with a blank canvas
    });
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update song (title, metadata, and sections array)
router.put('/:id', protect, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ message: 'Song not found' });
    if (song.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      req.body, // Replaces fields including the sections array
      { new: true }
    );
    res.json(updatedSong);
  } catch (error) {
    console.error('Save Error:', error.message); // <-- This will tell you exactly what MongoDB is complaining about next time
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single song by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ message: 'Song not found' });
    if (song.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;