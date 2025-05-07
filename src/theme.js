import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue
      light: '#4dabf5',
      dark: '#1976d2',
    },
    secondary: {
      main: '#00bcd4', // Teal/Cyan
      light: '#33c9dc',
      dark: '#008394',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      card: '#252525',
      darker: '#0a0a0a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      accent: '#4dabf5',
    },
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 22px',
          transition: 'all 0.3s ease-in-out',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#252525',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
          backdropFilter: 'blur(20px)',
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '40px',
          paddingBottom: '40px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(18, 18, 18, 0.8)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});