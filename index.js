// index.js
// File Metadata Microservice - Backend Implementation

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Route handler for the root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for file analysis
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.json({ error: 'No file uploaded' });
    }

    // Return file metadata
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    res.json({ error: 'Error processing file' });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('File Metadata Microservice is running on port ' + listener.address().port);
});

module.exports = app; 