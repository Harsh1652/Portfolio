import React, { useState, useRef } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  CircularProgress,
  Divider,
  Zoom,
  Tooltip
} from '@mui/material';
import {
  Email,
  Phone,
  GitHub,
  LinkedIn,
  Code,
  Send,
  LocationOn,
  AccessTime
} from '@mui/icons-material';
import SectionTitle from './SectionTitle';

const ContactSection = () => {
  const theme = useTheme();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Updated Google Sheets script endpoint
  const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzIyALY5IW4Ov8JRnaopmKVxHXWTh98ZjpAFtu9cEF3UpUDmzphF7P4kQRFMl2MeHwS/exec";

  const contactInfo = [
    {
      icon: <Email color="primary" fontSize="large" />,
      title: 'Email',
      value: 'harsh160502@gmail.com',
      link: 'mailto:harsh160502@gmail.com'
    },
    {
      icon: <Phone color="primary" fontSize="large" />,
      title: 'Phone',
      value: '+91 9982346893',
      link: 'tel:+919982346893'
    },
    {
      icon: <GitHub color="primary" fontSize="large" />,
      title: 'GitHub',
      value: 'Harsh1652',
      link: 'https://github.com/Harsh1652'
    },
    {
      icon: <LinkedIn color="primary" fontSize="large" />,
      title: 'LinkedIn',
      value: 'harsh-gupta16',
      link: 'https://linkedin.com/in/harsh-gupta16'
    },
    {
      icon: <Code color="primary" fontSize="large" />,
      title: 'LeetCode',
      value: 'harsh160502',
      link: 'https://leetcode.com/harsh160502'
    }
  ];

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

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Create form data object for submission
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Add timestamp
      formDataToSend.append('timestamp', new Date().toISOString());
      
      // Use fetch with no-cors mode to handle CORS limitations
      // Note: This means we won't be able to read the response data
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Script endpoints
        body: formDataToSend,
      });
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Message sent successfully! I will get back to you soon.',
        severity: 'success'
      });
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later.',
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
    <Box 
      id="contact" 
      component="section" 
      sx={{ 
        py: 6, // Reduced from py: 10
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(15, 15, 15, 0.9)' 
          : 'rgba(245, 245, 250, 0.8)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 30% 30%, rgba(25, 118, 210, 0.05), transparent 25%), radial-gradient(circle at 70% 70%, rgba(25, 118, 210, 0.05), transparent 25%)'
            : 'radial-gradient(circle at 30% 30%, rgba(25, 118, 210, 0.08), transparent 25%), radial-gradient(circle at 70% 70%, rgba(25, 118, 210, 0.08), transparent 25%)',
          zIndex: -1,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Let's discuss your project or opportunity" 
          sx={{
            '& .MuiTypography-h2': {
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                borderRadius: '2px'
              }
            }
          }}
        />
        
        {/* Side by side layout with fixed width percentage */}
        <Box sx={{ 
          mt: 3,
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4, 
          justifyContent: 'space-between' 
        }}>
          {/* Contact Form - 48% width */}
          <Box sx={{ width: { xs: '100%', md: '48%' } }}>
            <Paper 
              elevation={6} 
              sx={{ 
                p: { xs: 3, sm: 4 }, 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[10]
                },
                height: '100%', // Make sure both cards have the same height
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom fontWeight="500">
                Send a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Have a question or want to work together? Fill out the form below.
              </Typography>
              
              <Box 
                component="form" 
                ref={formRef}
                noValidate 
                onSubmit={handleFormSubmit} 
                sx={{ 
                  mt: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  '& .MuiTextField-root': {
                    width: '100%',
                    mb: 2.5
                  }
                }}
              >
                <TextField
                  required
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
                <TextField
                  required
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
                <TextField
                  label="Phone Number (optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  variant="outlined"
                  placeholder="+1 (123) 456-7890"
                  InputProps={{
                    startAdornment: (
                      <Phone color="action" sx={{ mr: 1, opacity: 0.6 }} />
                    ),
                    sx: { borderRadius: 1.5 }
                  }}
                />
                <TextField
                  required
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
                <TextField
                  required
                  label="Your Message"
                  name="message"
                  multiline
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ 
                    mt: 3,
                    mb: 2, 
                    py: 1.5, 
                    borderRadius: 2,
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    '&:hover': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: `0 4px 20px 0 ${theme.palette.mode === 'dark' 
                        ? 'rgba(25, 118, 210, 0.5)' 
                        : 'rgba(25, 118, 210, 0.3)'}`
                    }
                  }}
                  disabled={loading}
                  startIcon={loading ? null : <Send />}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  ) : (
                    'Send Message'
                  )}
                </Button>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                  Your information is secure and will not be shared with third parties
                </Typography>
              </Box>
            </Paper>
          </Box>
          
          {/* Contact Info Card - 48% width */}
          <Box sx={{ width: { xs: '100%', md: '48%' } }}>
            <Paper 
              elevation={6} 
              sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[10]
                },
                height: '100%', // Make sure both cards have the same height
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box 
                sx={{ 
                  p: 4,
                  pt: 3,
                  pb: 1,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white'
                }}
              >
                <Typography variant="h5" component="h3" fontWeight="500">
                  Contact Information
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                  Feel free to reach out through any of these channels
                </Typography>
              </Box>
              
              <Box sx={{ p: 4 }}>
                <Box sx={{ mb: 4 }}>
                  {contactInfo.map((item, index) => (
                    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                      <div>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 2.5,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateX(8px) scale(1.02)',
                              '& .MuiTypography-body2': {
                                color: theme.palette.primary.main,
                                fontWeight: 600
                              }
                            }
                          }}
                        >
                          <Tooltip title={`Connect via ${item.title}`} placement="left" arrow>
                            <IconButton 
                              component="a"
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ 
                                mr: 2,
                                backgroundColor: theme.palette.mode === 'dark' 
                                  ? 'rgba(25, 118, 210, 0.15)'
                                  : 'rgba(25, 118, 210, 0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.main,
                                  transform: 'rotate(10deg) scale(1.15)',
                                  '& .MuiSvgIcon-root': {
                                    color: 'white',
                                    transform: 'rotate(-10deg)'
                                  }
                                }
                              }}
                            >
                              {item.icon}
                            </IconButton>
                          </Tooltip>
                          
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" fontWeight="500">
                              {item.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              component="a"
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                textDecoration: 'none',
                                color: 'text.primary',
                                fontWeight: 500,
                                transition: 'color 0.3s, transform 0.3s',
                                display: 'inline-block',
                                '&:hover': {
                                  color: theme.palette.primary.main,
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        </Box>
                        {index < contactInfo.length - 1 && (
                          <Divider sx={{ my: 2, opacity: 0.7 }} />
                        )}
                      </div>
                    </Zoom>
                  ))}
                </Box>
                
                <Divider sx={{ mt: 4, mb: 4 }} />
                
                <Box>
                  <Typography variant="h6" fontWeight="500" gutterBottom>
                    Availability
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2, 
                      mt: 3,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    <AccessTime 
                      color="primary" 
                      sx={{ 
                        mr: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'rotate(360deg)'
                        }
                      }} 
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Response Time
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        Within 24 hours
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    <LocationOn 
                      color="primary" 
                      sx={{ 
                        mr: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px) translateX(5px)'
                        }
                      }} 
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Current Status
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        Available for new opportunities
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            boxShadow: 4
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;