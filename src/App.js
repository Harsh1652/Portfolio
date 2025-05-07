import React, { useState, useEffect } from 'react';
import { 
  CssBaseline, 
  ThemeProvider, 
  Box,
  useMediaQuery,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { theme } from './theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ServiceSection from './components/ServiceSection';
import ProjectSection from './components/ProjectSection';
import TestimonialSection from './components/TestimonialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Navbar />
        <Box component="main" sx={{ overflow: 'hidden' }}>
          <div id="home">
            <HeroSection />
          </div>
          <div id="about">
            <AboutSection />
          </div>
          <div id="skills">
            <SkillsSection />
          </div>
          <div id="services">
            <ServiceSection />
          </div>
          <div id="projects">
            <ProjectSection />
          </div>
          <div id="testimonials">
            <TestimonialSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;