// src/components/TestimonialForm.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { addTestimonial } from '../utils/testimonialService';

// Add onSubmitSuccess prop
const TestimonialForm = ({ open, handleClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    message: '',
    rating: 5
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Submit to backend
      await addTestimonial(formData);
      
      setSnackbar({
        open: true,
        message: 'Thank you for your testimonial!',
        severity: 'success'
      });
      
      // Reset form and close dialog
      setFormData({
        name: '',
        company: '',
        role: '',
        message: '',
        rating: 5
      });
      
      handleClose();
      
      // Notify parent to refresh testimonials
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit testimonial. Please try again later.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Share Your Experience</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            I appreciate your feedback! Please share your experience working with me or my projects.
          </DialogContentText>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              autoFocus
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="company"
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="role"
              label="Your Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            
            <Box sx={{ mt: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                size="large"
              />
            </Box>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="message"
              label="Your Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            color="primary"
            variant="contained" 
            startIcon={<Send />}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TestimonialForm;