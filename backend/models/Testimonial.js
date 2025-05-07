const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  company: String,
  role: String,
  message: String,
  rating: { type: Number, default: 5 },
  avatar: { type: String }, // Add avatar field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);