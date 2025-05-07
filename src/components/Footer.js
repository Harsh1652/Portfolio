import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  Link,
  Divider,
  useTheme
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Code as CodeIcon,
  KeyboardArrowUp
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, // Reduced from py: 6
        backgroundColor: theme.palette.background.paper,
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        mt: 4 // Reduced from mt: 8
      }}
    >
      <IconButton
        onClick={scrollToTop}
        aria-label="scroll to top"
        sx={{
          position: 'absolute',
          top: -25,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          boxShadow: theme.shadows[4],
        }}
      >
        <KeyboardArrowUp />
      </IconButton>
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Harsh Gupta
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Backend Developer | Problem Solver | System Architect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Building secure, scalable, and intelligent systems that solve real-world problems.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& > a': {
                  mb: 1,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Link href="#home">Home</Link>
              <Link href="#about">About</Link>
              <Link href="#skills">Skills</Link>
              <Link href="#services">Services</Link>
              <Link href="#projects">Projects</Link>
              <Link href="#testimonials">Testimonials</Link>
              <Link href="#contact">Contact</Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Me
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                component="a"
                href="https://github.com/Harsh1652"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{
                  mr: 1,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    color: 'primary.main',
                  },
                }}
              >
                <GitHub fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com/in/harsh-gupta16"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{
                  mr: 1,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    color: 'primary.main',
                  },
                }}
              >
                <LinkedIn fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://leetcode.com/harsh160502"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                sx={{
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    color: 'primary.main',
                  },
                }}
              >
                <CodeIcon fontSize="large" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Email: harsh160502@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +91 9982346893
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Harsh Gupta. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 1, sm: 0 } }}>
            Designed & Built with 💻 and ❤️
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;