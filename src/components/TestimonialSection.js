// src/components/TestimonialSection.js
import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Rating, 
  Button,
  useTheme,
  Divider,
  IconButton
} from '@mui/material';
import { FormatQuote, Add } from '@mui/icons-material';
import SectionTitle from './SectionTitle';
import TestimonialForm from './TestimonialForm';
import { useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getTestimonials } from '../utils/testimonialService'; // Adjust the import path as necessary
import { useEffect } from 'react';

const TestimonialsSection = () => {
  const [openTestimonialForm, setOpenTestimonialForm] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample testimonials
  const sampleTestimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Project Manager",
      company: "TechSolutions Inc.",
      rating: 5,
      message: "Harsh is an exceptional developer who consistently delivers high-quality work. His expertise in backend development and problem-solving skills made him an invaluable asset to our project. I highly recommend him for any challenging development tasks.",
      avatar: "/assets/testimonials/avatar1.jpg"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "UI/UX Designer",
      company: "DesignWorks",
      rating: 5,
      message: "Working with Harsh was a great experience. Despite being primarily a backend developer, he understood the importance of user experience and collaborated effectively with our design team. His implementation of our designs was flawless.",
      avatar: "/assets/testimonials/avatar2.jpg"
    },
    {
      id: 3,
      name: "Aditya Verma",
      role: "CEO",
      company: "StartUp Ventures",
      rating: 4,
      message: "Harsh helped us develop a secure and scalable backend for our startup. His attention to detail and focus on security was exactly what we needed. He's reliable, communicative, and delivers on time.",
      avatar: "/assets/testimonials/avatar3.jpg"
    }
  ];

  const handleOpenForm = () => {
    setOpenTestimonialForm(true);
  };

  const handleCloseForm = () => {
    setOpenTestimonialForm(false);
  };


  const [testimonials, setTestimonials] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTestimonialSubmitted = () => {
    // Increment to trigger useEffect
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        console.log("Fetched testimonials:", data); // Debug log
        
        // Ensure unique testimonials by ID
        const uniqueTestimonials = Array.from(
          new Map(data.map(item => [item.id, item])).values()
        );
        
        // Only use sample data if API returns empty
        setTestimonials(uniqueTestimonials.length > 0 ? uniqueTestimonials : sampleTestimonials);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        // Fallback to sample data on error
        setTestimonials(sampleTestimonials);
      }
    };
    fetchTestimonials();
  }, [refreshTrigger]); // Add refreshTrigger as dependency


  const sliderSettings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 500,
    slidesToShow: isMobile ? 1 : Math.min(testimonials.length, 3),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(testimonials.length, 2),
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const TestimonialCard = ({ testimonial }) => (
    <Box sx={{ px: 2, py: 1 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 3,
          boxShadow: theme.shadows[4],
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[8]
          }
        }}
      >
        <FormatQuote 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            fontSize: '2rem',
            color: 'primary.main',
            opacity: 0.3
          }} 
        />
        
        <CardContent sx={{ pt: 4, flexGrow: 1 }}>
          <Typography 
            variant="body1" 
            component="div" 
            sx={{ 
              fontStyle: 'italic',
              mb: 3,
              minHeight: '100px'
            }}
          >
            "{testimonial.message}"
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar 
              src={testimonial.avatar} 
              sx={{ 
                width: 56, 
                height: 56,
                border: `2px solid ${theme.palette.primary.main}`
              }}
            >
              {testimonial.name.charAt(0)}
            </Avatar>
            
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" component="div">
                {testimonial.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                {testimonial.role}
                {testimonial.company && ` at ${testimonial.company}`}
              </Typography>
              
              <Rating 
                value={testimonial.rating} 
                readOnly 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box 
      id="testimonials" 
      component="section" 
      sx={{ 
        py: 4, // Reduced from py: 8
        backgroundColor: theme.palette.background.default
      }}
    >
      <Container>
        <SectionTitle 
          title="Testimonials" 
          subtitle="What others say about working with me" 
        />
        
        <Box sx={{ mt: 6, position: 'relative' }}>
          {testimonials.length > 0 ? (
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </Slider>
          ) : (
            <Typography variant="body1" textAlign="center" sx={{ py: 4 }}>
              No testimonials yet. Be the first to share your experience!
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenForm}
            size="large"
            sx={{ 
              px: 4, 
              py: 1,
              borderRadius: 2,
              boxShadow: theme.shadows[4]
            }}
          >
            Add Your Testimonial
          </Button>
        </Box>
        
        <TestimonialForm 
          open={openTestimonialForm} 
          handleClose={handleCloseForm}
          onSubmitSuccess={handleTestimonialSubmitted} 
        />
      </Container>
    </Box>
  );
};

export default TestimonialsSection;