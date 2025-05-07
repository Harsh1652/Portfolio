import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <Box 
      sx={{ 
        textAlign: align, 
        mb: 6,
        mx: 'auto',
        maxWidth: '800px'
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196f3 30%, #00bcd4 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: align, alignItems: 'center', mb: 2 }}>
        <Divider sx={{ width: '40px', borderColor: 'primary.main', borderWidth: 2, mx: 1 }} />
        <Box 
          sx={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: 'secondary.main',
            transform: 'rotate(45deg)'
          }} 
        />
        <Divider sx={{ width: '40px', borderColor: 'primary.main', borderWidth: 2, mx: 1 }} />
      </Box>
      
      {subtitle && (
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;