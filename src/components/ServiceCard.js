// File: src/components/ServiceCard.js
import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description, features, color }) => {
  return (
    <Paper
      component={motion.div}
      whileHover={{ 
        y: -10,
        boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      sx={{
        p: 4,
        height: '100%',
        width: '100%',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.card',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '5px',
          background: color,
        },
        mx: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 70,
          height: 70,
          borderRadius: '50%',
          bgcolor: `${color}15`,
          color: color,
          mb: 3,
        }}
      >
        {icon}
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <Box sx={{ mt: 'auto' }}>
        <List dense disablePadding>
          {features.map((feature, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircle fontSize="small" sx={{ color }} />
              </ListItemIcon>
              <ListItemText 
                primary={feature} 
                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default ServiceCard;