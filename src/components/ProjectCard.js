// ProjectCard.js
import React from 'react';
import {
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const { title, description, image, techStack, demoLink, githubLink, emoji } = project;
  
  return (
    <Box
      sx={{
        width: '100%',
        height: '550px', // Strict fixed height
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#212121', // Dark background
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
        }
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          width: '100%',
          height: '200px', // Fixed height for image
          overflow: 'hidden',
          backgroundColor: '#121212', // Even darker for image background
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src={image || `/assets/projects/placeholder.png`}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Box>
      
      {/* Content Container */}
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '350px', // Fixed height for content
        }}
      >
        {/* Title Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            height: '40px', // Fixed height
          }}
        >
          {emoji && (
            <Typography
              component="span"
              sx={{ fontSize: '1.5rem', mr: 1 }}
            >
              {emoji}
            </Typography>
          )}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 600,
              color: 'white',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </Typography>
        </Box>
        
        {/* Description Section */}
        <Box
          sx={{
            mb: 2,
            height: '80px', // Fixed height
            overflow: 'hidden'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#aaa', // Lighter text for description
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              lineHeight: '1.3'
            }}
          >
            {description}
          </Typography>
        </Box>
        
        {/* Tech Stack Section */}
        <Box sx={{ mb: 3, height: '100px' }}> {/* Fixed height */}
          <Typography
            variant="subtitle2"
            sx={{ color: '#90caf9', mb: 1 }} // Blue text
          >
            Tech Stack:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}
          >
            {techStack.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'rgba(144, 202, 249, 0.15)', // Semi-transparent blue
                  color: '#90caf9', // Blue text
                  borderRadius: '4px',
                  height: '24px',
                  fontSize: '0.7rem'
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Links Section */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mt: 'auto', // Push to bottom
            pt: 1
          }}
        >
          {githubLink && (
            <Box
              component="a"
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#aaa',
                textDecoration: 'none',
                '&:hover': { color: '#90caf9' }
              }}
            >
              <GitHub sx={{ mr: 0.5, fontSize: '18px' }} />
              <Typography variant="button" sx={{ fontSize: '0.8rem' }}>
                Code
              </Typography>
            </Box>
          )}
          
          {demoLink && (
            <Box
              component="a"
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#aaa',
                textDecoration: 'none',
                '&:hover': { color: '#90caf9' }
              }}
            >
              <Launch sx={{ mr: 0.5, fontSize: '18px' }} />
              <Typography variant="button" sx={{ fontSize: '0.8rem' }}>
                Live Demo
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;