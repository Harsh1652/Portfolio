import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import { School, Work, Download } from '@mui/icons-material';
import SectionTitle from './SectionTitle';
import { motion } from 'framer-motion';
import bannerImage from '../assets/banner.png';


const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 }, // Reduced from { xs: 8, md: 12 }
        position: 'relative',
        bgcolor: 'background.darker',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(33, 150, 243, 0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle 
          title="About Me" 
          subtitle="Passionate About Building What Matters" 
        />
        
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component={motion.div}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  right: 20,
                  bottom: 20,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  zIndex: -1,
                  display: { xs: 'none', md: 'block' }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  width: '70%',
                  height: '70%',
                  backgroundColor: 'secondary.main',
                  opacity: 0.1,
                  borderRadius: 2,
                  zIndex: -2,
                  display: { xs: 'none', md: 'block' }
                }
              }}
            >
              <Box
                component="img"
                src={bannerImage}
                alt="Harsh Gupta"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Box
              component={motion.div}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Hello, I'm <Typography component="span" color="primary" variant="h4" sx={{ fontWeight: 'bold' }}>Harsh Gupta</Typography>
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                I'm a passionate backend developer with full-stack capabilities, currently working at Excollo. With a focus on designing robust, scalable, and secure systems, I enjoy tackling complex problems and turning them into elegant solutions.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                My journey in software development began during my Bachelor's in Computer Applications (BCA), and I've since been continuously expanding my skills through my Master's program and professional work. I'm particularly interested in backend architecture, API design, and creating performant applications.
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>Email:</Typography>
                    <Link 
                      href="mailto:harsh160502@gmail.com"
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' } 
                      }}
                    >
                      harsh160502@gmail.com
                    </Link>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>Phone:</Typography>
                    <Link 
                      href="tel:+919982346893"
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' } 
                      }}
                    >
                      +91 9982346893
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>GitHub:</Typography>
                    <Link 
                      href="https://github.com/Harsh1652"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' } 
                      }}
                    >
                      github.com/Harsh1652
                    </Link>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>LinkedIn:</Typography>
                    <Link 
                      href="https://linkedin.com/in/harsh-gupta16"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' } 
                      }}
                    >
                      linkedin.com/in/harsh-gupta16
                    </Link>
                  </Box>
                </Grid>
              </Grid>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<Download />}
                sx={{ mb: 4 }}
                href="https://drive.google.com/uc?export=download&id=1WTa0MMUmavW9f0nB2AjpuU0PNtDPdMK4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </Button>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  component={motion.div}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      height: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <School color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Education</Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Master of Computer Applications (MCA)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        2023 - 2025
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Bachelor of Computer Applications (BCA)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        2020 - 2023
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box
                  component={motion.div}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      height: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Work color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Experience</Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Backend Developer
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Excollo
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Developing secure and scalable backend systems, designing APIs,
                        and implementing database solutions.
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;