import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2979ff',
      light: '#5393ff',
      dark: '#004ecb',
    },
    secondary: {
      main: '#00b0ff',
      light: '#69e2ff',
      dark: '#0081cb',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
    },
  },
  typography: {
    fontFamily: '"Exo 2", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.00833em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02857em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '10px 24px',
          boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(41, 121, 255, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2979ff 30%, #00b0ff 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});