import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import SectionTitle from './SectionTitle';
import ServiceCard from './ServiceCard';
import {
  Web as WebIcon,
  PhoneAndroid as MobileIcon,
  SmartToy as BotIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ServiceSection = () => {
  const services = [
    {
      icon: <WebIcon fontSize="large" />,
      title: "Web Application Development",
      description: "End-to-end web application solutions with robust backend systems and intuitive user interfaces.",
      features: [
        "Secure authentication systems",
        "RESTful API development",
        "Database design & optimization",
        "Responsive UI/UX implementation"
      ],
      color: "#2196f3" // Blue
    },
    {
      icon: <MobileIcon fontSize="large" />,
      title: "Mobile Application Development",
      description: "Performant mobile applications with seamless backend integration and cross-platform compatibility.",
      features: [
        "Native & cross-platform solutions",
        "API integration",
        "Real-time data synchronization",
        "Offline-first functionality"
      ],
      color: "#00bcd4" // Teal
    },
    {
      icon: <BotIcon fontSize="large" />,
      title: "AI ChatBot Development",
      description: "Intelligent conversational agents powered by modern AI technologies and natural language processing.",
      features: [
        "Intent recognition systems",
        "Natural language processing",
        "Integration with third-party services",
        "Continuous training & improvement"
      ],
      color: "#7c4dff" // Purple
    },
   
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Split services into pairs for a 2-column layout
  const pairs = [];
  for (let i = 0; i < services.length; i += 2) {
    pairs.push(services.slice(i, Math.min(i + 2, services.length)));
  }

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionTitle
          title="Services"
          subtitle="What I Can Do For You"
        />
        
        <Box 
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          sx={{ mt: 6 }}
        >
          {pairs.map((pair, rowIndex) => (
            <Box 
              key={rowIndex} 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                mb: 4
              }}
            >
              {pair.map((service, index) => (
                <Box 
                  key={`${rowIndex}-${index}`} 
                  sx={{ 
                    width: { xs: '100%', md: 'calc(50% - 16px)' }
                  }}
                >
                  <ServiceCard {...service} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceSection;