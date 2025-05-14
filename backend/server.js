const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Fix: Change from Testimonials to Testimonial to match your file name
const testimonialRoutes = require('./routes/Testimonial');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/testimonials', testimonialRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.error(err));