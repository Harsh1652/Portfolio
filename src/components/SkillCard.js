import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const SkillCard = ({ title, icon, level, color }) => {
  return (
    <Paper
      component={motion.div}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      sx={{
        p: 2.5,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.card',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box 
          sx={{ 
            mr: 2, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: 40, 
            height: 40, 
            borderRadius: '8px',
            bgcolor: `${color}22`,
            color: color,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 1, mt: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Proficiency
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {level}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={level} 
          sx={{ 
            height: 6, 
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.05)',
            '& .MuiLinearProgress-bar': {
              bgcolor: color,
            }
          }} 
        />
      </Box>
    </Paper>
  );
};

export default SkillCard;