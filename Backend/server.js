const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ADD THIS CUSTOM MIDDLEWARE: Security headers for Google Auth
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected to SonusLab Studio'))
  .catch(err => console.log('DB Connection Error:', err));

// Route Mounts
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/songs', require('./routes/songRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Studio Console running on port ${PORT}`));