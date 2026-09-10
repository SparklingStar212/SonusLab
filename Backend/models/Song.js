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
    key: { type: String, default: 'C Major' },
    bpm: { type: Number, default: 120 }
  },
  sections: [sectionSchema],
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