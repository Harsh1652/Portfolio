import React from 'react';
import { Box, Container, Grid, Typography, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import SkillCard from './SkillCard';
import {
  Code as CodeIcon,
  Storage as DatabaseIcon,
  DeveloperBoard as BackendIcon,
  Devices as FrontendIcon,
  DesignServices as DesignIcon,
  BuildCircle as BuildIcon,
  AccountTree as SystemIcon,
  Search as SearchIcon,
  Extension as ExtensionIcon,
  Security as SecurityIcon,
  Api as ApiIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

const SkillsSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const languages = [
    { title: "Java", icon: <CodeIcon />, level: 90, color: "#f89820" },
    { title: "Kotlin", icon: <CodeIcon />, level: 85, color: "#A97BFF" },
    { title: "JavaScript", icon: <CodeIcon />, level: 80, color: "#F7DF1E" },
  ];

  const frontend = [
    { title: "HTML", icon: <FrontendIcon />, level: 85, color: "#E44D26" },
    { title: "CSS", icon: <DesignIcon />, level: 80, color: "#264DE4" },
    { title: "JavaScript", icon: <CodeIcon />, level: 80, color: "#F7DF1E" },
    { title: "React", icon: <FrontendIcon />, level: 75, color: "#61DAFB" },
  ];

  const backend = [
    { title: "Spring Boot", icon: <BackendIcon />, level: 90, color: "#6DB33F" },
    { title: "Jakarta EE", icon: <BackendIcon />, level: 85, color: "#F80000" },
    { title: "Hibernate", icon: <ApiIcon />, level: 80, color: "#BCAE79" },
    { title: "Node.js", icon: <BackendIcon />, level: 75, color: "#68A063" },
    { title: "Express", icon: <ApiIcon />, level: 70, color: "#888888" },
    { title: "REST APIs", icon: <ApiIcon />, level: 85, color: "#90CAF9" },
  ];

  const databases = [
    { title: "MySQL", icon: <DatabaseIcon />, level: 85, color: "#4479A1" },
    { title: "MongoDB", icon: <DatabaseIcon />, level: 80, color: "#4DB33D" },
  ];

  const tools = [
    { title: "Maven", icon: <BuildIcon />, level: 85, color: "#C71A36" },
    { title: "GitHub", icon: <GitHubIcon />, level: 80, color: "#FFFFFF" },
  ];

  const concepts = [
    { title: "OOP", icon: <SystemIcon />, level: 90, color: "#FFA726" },
    { title: "System Design", icon: <SystemIcon />, level: 85, color: "#29B6F6" },
    { title: "Security", icon: <SecurityIcon />, level: 80, color: "#66BB6A" },
    { title: "Real-time Systems", icon: <ExtensionIcon />, level: 75, color: "#EC407A" },
  ];

  const tabContent = () => {
    switch (value) {
      case 0:
        return (
          <Grid container spacing={3} component={motion.div} variants={containerVariants}>
            {languages.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkillCard {...skill} />
              </Grid>
            ))}
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3} component={motion.div} variants={containerVariants}>
            {frontend.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkillCard {...skill} />
              </Grid>
            ))}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3} component={motion.div} variants={containerVariants}>
            {backend.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkillCard {...skill} />
              </Grid>
            ))}
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3} component={motion.div} variants={containerVariants}>
            {databases.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkillCard {...skill} />
              </Grid>
            ))}
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3} component={motion.div} variants={containerVariants}>
            {tools.concat(concepts).map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkillCard {...skill} />
              </Grid>
            ))}
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 }, // Reduced from { xs: 8, md: 12 }
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle 
          title="Skills" 
          subtitle="My Technical Expertise" 
        />
        
        <Box sx={{ mb: 6 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: { sm: 'center' },
              },
              '& .MuiTab-root': {
                minWidth: { xs: 'auto', md: 120 },
                px: { xs: 2, md: 3 },
              },
            }}
          >
            <Tab label="Languages" />
            <Tab label="Frontend" />
            <Tab label="Backend" />
            <Tab label="Databases" />
            <Tab label="Tools & Concepts" />
          </Tabs>
        </Box>
        
        <Box
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {tabContent()}
        </Box>
      </Container>
    </Box>
  );
};

export default SkillsSection;