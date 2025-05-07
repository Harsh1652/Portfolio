import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useScrollTrigger,
  Slide,
  Fade,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, KeyboardArrowUp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector('#home');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (mobileOpen) setMobileOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Harsh Gupta
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.id} 
            onClick={() => handleNavClick(item.id)}
            sx={{
              color: activeSection === item.id ? 'primary.main' : 'text.primary',
              borderLeft: activeSection === item.id ? `3px solid ${theme.palette.primary.main}` : 'none',
              pl: activeSection === item.id ? 2 : 3,
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar component="nav" position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  flexGrow: 1, 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                Harsh Gupta
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    sx={{
                      mx: 1,
                      color: 'text.primary',
                      position: 'relative',
                      fontWeight: activeSection === item.id ? 'bold' : 'normal',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: activeSection === item.id ? '80%' : '0%',
                        height: '2px',
                        bottom: '5px',
                        left: '10%',
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease-in-out'
                      },
                      '&:hover::after': {
                        width: '80%'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ mr: 0, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Box component="nav">
        <Drawer
          anchor={isMobile ? 'right' : 'left'}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              backgroundColor: 'background.paper'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="div" sx={{ height: { xs: '56px', sm: '64px' } }} />
      <ScrollTop>
        <IconButton
          size="large"
          aria-label="scroll back to top"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </ScrollTop>
    </>
  );
}