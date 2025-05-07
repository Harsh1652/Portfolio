import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { GitHub, LinkedIn, Code } from '@mui/icons-material';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #121212, #1a1a1a)',
        pt: { xs: 4, md: 0 }
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.2
        }}
      >
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              background: i % 2 === 0 ? 'linear-gradient(45deg, #2196f3, transparent)' : 'linear-gradient(45deg, #00bcd4, transparent)',
              filter: 'blur(5px)',
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>

      {/* Grid pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(18, 18, 18, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 18, 18, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
          opacity: 0.2
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid 
          container 
          spacing={4} 
          alignItems="center" 
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
            <Box>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 500,
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(33, 150, 243, 0.1)',
                  }}
                >
                  Hello, I'm
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
                  }}
                >
                  Harsh Gupta
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h4" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Backend Developer | Problem Solver | System Architect
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4, 
                    fontSize: '1.1rem',
                    maxWidth: '600px' 
                  }}
                >
                  I build secure, scalable, and intelligent systems that solve real-world problems.
                </Typography>
              </motion.div>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    onClick={() => handleNavClick('projects')}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    View Projects
                  </Button>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={() => handleNavClick('contact')}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    Get in Touch
                  </Button>
                </motion.div>
              </Box>
              
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="text" 
                    color="inherit" 
                    startIcon={<GitHub />}
                    href="https://github.com/Harsh1652" 
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </Button>
                  <Button 
                    variant="text" 
                    color="inherit" 
                    startIcon={<LinkedIn />}
                    href="https://linkedin.com/in/harsh-gupta16" 
                    target="_blank"
                    rel="noopener"
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="text" 
                    color="inherit" 
                    startIcon={<Code />}
                    href="https://leetcode.com/harsh160502/" 
                    target="_blank"
                    rel="noopener"
                  >
                    LeetCode
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }} sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Avatar
                src={profileImage}
                alt="Harsh Gupta"
                sx={{
                  width: { xs: 200, sm: 280, md: 320 },
                  height: { xs: 200, sm: 280, md: 320 },
                  mx: 'auto',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: `0 0 30px ${theme.palette.primary.main}40`,
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Scroll indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        sx={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handleNavClick('about')}
      >
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          Scroll Down
        </Typography>
        <Box
          component={motion.div}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          sx={{
            width: '30px',
            height: '50px',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center',
            padding: '5px 0',
          }}
        >
          <Box
            component={motion.div}
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            sx={{
              width: '6px',
              height: '10px',
              backgroundColor: 'primary.main',
              borderRadius: '3px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;