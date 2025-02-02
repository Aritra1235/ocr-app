// index.js
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

let clients = new Set(); // Add this line

// Enable CORS
app.use(cors()); // Add this line before your routes

// Configure Multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure that the 'uploads' folder exists
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the current timestamp
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Add SSE endpoint
app.get('/progress', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.add(res);

  req.on('close', () => clients.delete(res));
});

// Define the OCR endpoint
app.post('/ocr', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  try {
    // Perform OCR on the uploaded image
    const { data: { text } } = await Tesseract.recognize(
      req.file.path,
      'eng', // Specify language; you can change or add languages as needed
      {
        logger: m => {
          console.log(m);
          // Send progress to all connected clients
          if (m.status === 'recognizing text') {
            const progress = Math.round(m.progress * 100);
            clients.forEach(client => 
              client.write(`data: ${JSON.stringify({ progress })}\n\n`)
            );
          }
        }
      }
    );

    // Optionally, remove the file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete uploaded file:', err);
    });

    // Send the OCR result back to the client
    console.log('OCR result:', text);
    res.json({ text });
  } catch (err) {
    console.error('OCR processing error:', err);
    res.status(500).json({ error: 'Error processing image for OCR.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`OCR API server is running on port ${port}`);
});
