// ProjectsSection.js
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';

// Import project images - with error handling
import shopEaseImage from '../assets/projects/ShopEase.png';
import chattifyImage from '../assets/projects/Chattify.png';
import secureNetImage from '../assets/projects/SecureNet.png';

const ProjectsSection = () => {
  // Start with null images and set them properly after component mounts
  const [projectsData, setProjectsData] = useState([]);
  
  useEffect(() => {
    const projects = [
      {
        title: 'ShopEase',
        emoji: '🛍️',
        description: 'Full-stack e-commerce platform with authentication and admin features. Includes product catalog, user management, cart functionality, and order processing.',
        techStack: ['Spring Boot', 'MySQL', 'Thymeleaf', 'REST API'],
        githubLink: 'https://github.com/Harsh1652/shopease',
        image: shopEaseImage // Use direct path to image
      },
      {
        title: 'Chattify',
        emoji: '💬',
        description: 'Real-time chat application with Socket.io and Cloudinary integration. Features include user authentication, image sharing, and persistent conversation history.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        githubLink: 'https://github.com/Harsh1652/chattify',
        image: chattifyImage // Use direct path to image
      },
      {
        title: 'SecureNet',
        emoji: '🔐',
        description: 'Intrusion Detection System and vulnerability scanner integrating Snort/Nikto with a Spring Boot dashboard for comprehensive security monitoring.',
        techStack: ['Java', 'MySQL', 'Spring Boot', 'REST API'],
        githubLink: 'https://github.com/Harsh1652/securenet',
        image: secureNetImage // Use direct path to image
      },
      {
        title: 'Balaji Exports',
        emoji: '💼',
        description: 'Freelance project to build a business website for Balaji Exports using React and Material-UI. Features responsive design and product showcase.',
        techStack: ['React', 'Material-UI', 'Responsive Design'],
        githubLink: 'https://github.com/Harsh1652/balaji-exports',
        demoLink: '#',
        image: '/assets/projects/placeholder.png' // Use placeholder if no specific image
      }
    ];
    
    setProjectsData(projects);
  }, []);

  return (
    <Box 
      id="projects" 
      component="section" 
      sx={{ 
        py: 2, // Reduced from py: 8
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          title="Projects"
          subtitle="Recent work that showcases my skills and passion"
        />
        
        {/* Custom grid layout instead of Material-UI Grid */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          mt: 4,
          mx: -2 // Negative margin to offset padding of grid items
        }}>
          {projectsData.map((project, index) => (
            <Box 
              key={index}
              sx={{
                width: {
                  xs: '100%', // Full width on mobile
                  sm: '50%',  // Half width on tablet and above
                },
                px: 2,       // Padding for spacing between cards
                mb: 4,       // Bottom margin for vertical spacing
                boxSizing: 'border-box' // Include padding in width calculation
              }}
            >
              <ProjectCard project={project} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectsSection;