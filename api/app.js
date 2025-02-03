const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();


// Environment variables with defaults
const port = process.env.PORT || 5000;
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB default
const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes
const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

// Database Schema
const OcrResultSchema = new mongoose.Schema({
  originalFilename: String,
  processedText: String,
  processedAt: { type: Date, default: Date.now },
  fileSize: Number,
  // Add user information fields
  userInfo: {
    ipAddress: String,
    userAgent: String,
    platform: String,
    browser: String,
    language: String,
    timezone: String,
    screenResolution: String,
    referrer: String
  }
});

const OcrResult = mongoose.model('OcrResult', OcrResultSchema);

// Connect to MongoDB if DB_URI is provided
if (process.env.DB_URI) {
  mongoose.connect(process.env.DB_URI, {
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
}

// Rate limiter
const limiter = rateLimit({
  windowMs: rateLimitWindow,
  max: rateLimitMax,
  message: 'Too many requests from this IP, please try again later.'
});

app.set('trust proxy', 1);
let clients = new Set();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: true, credentials: true }));
} else {
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true
  }));
}

// CORS configuration


// Apply rate limiter to all routes
app.use(limiter);

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|bmp|tiff/i;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// SSE endpoint
app.get('/progress', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  clients.add(res);
  req.on('close', () => clients.delete(res));
});

// OCR endpoint
app.post('/ocr', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }
  console.log("Recieved Request")
  try {
    const { data: { text } } = await Tesseract.recognize(
      req.file.path,
      'eng',
      {
        logger: m => {
          console.log(m);
          if (m.status === 'recognizing text') {
            const progress = Math.round(m.progress * 100);
            clients.forEach(client => 
              client.write(`data: ${JSON.stringify({ progress })}\n\n`)
            );
          }
        }
      }
    );

    res.json({ text });

    const userIp = req.headers['x-forwarded-for']
        ? req.headers['x-forwarded-for'].split(',')[0] // Get the first IP in case of multiple
        : req.ip || req.socket.remoteAddress; // Fallback

    const ocrResult = new OcrResult({
      originalFilename: req.file.originalname,
      processedText: text,
      fileSize: req.file.size,
      userInfo: {
        ipAddress: userIp,
        userAgent: req.headers['user-agent'],
        language: req.headers['accept-language'],
        referrer: req.headers['referer'] || req.headers['referrer'],
        timezone: req.headers['time-zone'] || 'Not provided',
        platform: req.headers['sec-ch-ua-platform'] || 'Not provided',
        browser: req.headers['sec-ch-ua'] || 'Not provided'
      }
    });

    // Non-blocking database operation
    if (mongoose.connection.readyState === 1) {
      ocrResult.save().catch(err => {
        console.error('Error saving to database:', err);
      });
    }
    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete uploaded file:', err);
    });

  } catch (err) {
    console.error('OCR processing error:', err);
    res.status(500).json({ error: 'Error processing image for OCR.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: `File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB`
      });
    }
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    if (fs.existsSync(uploadDir)) {
      fs.rmSync(uploadDir, { recursive: true });
    }
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close().then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});