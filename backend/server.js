// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Basic middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://harsh-portfolio.vercel.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import routes
const testimonialRoutes = require('./routes/Testimonial');

// Simple routes first
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/testimonials', testimonialRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Check if MONGO_URI is provided
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI not found in environment variables');
      console.log('Please create a .env file in the backend directory with:');
      console.log('MONGO_URI=mongodb://localhost:27017/portfolio');
      console.log('');
      console.log('For now, using default local MongoDB connection...');
      process.env.MONGO_URI = 'mongodb://localhost:27017/portfolio';
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'portfolio' // Use lowercase to match existing database
    });
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📍 Database: ${process.env.MONGO_URI}`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`📊 Testimonials API: http://localhost:${PORT}/api/testimonials`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is installed and running');
      console.log('2. Try: brew services start mongodb-community (macOS)');
      console.log('3. Try: sudo systemctl start mongod (Linux)');
      console.log('4. Or use MongoDB Atlas cloud database');
    }
    
    process.exit(1);
  }
}

startServer();