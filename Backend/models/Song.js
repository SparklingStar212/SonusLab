const mongoose = require('mongoose');

// The modular building blocks (Verse, Chorus, Bridge)
const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Outro', 'Idea'],
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    required: true
  }
});

// V2: The new Chord schema for the Chord Lab
const chordSchema = new mongoose.Schema({
  root: {
    type: String,
    required: true
  },
  quality: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    required: true
  }
});

// The main project container
const songSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled Track'
  },
  metadata: {
    genre: { type: String, default: '' },
    mood: { type: String, default: '' },
    key: { type: String, default: 'C Major' }, // Note: We will use this exact string in Step 2
    bpm: { type: Number, default: 120 }
  },
  sections: [sectionSchema],
  progression: [chordSchema], // <-- V2: The chord timeline data lives here
  creativeNotes: {
    type: String,
    default: ''
  },
  // Foundation for future iterative saves
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', songSchema);