import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f88f2',
      light: '#7ab6ff',
      dark: '#0060bf',
    },
    secondary: {
      main: '#00e5ff',
      light: '#6effff',
      dark: '#00b2cc',
    },
    background: {
      default: '#0a1929',
      paper: '#0f2744',
    },
    error: {
      main: '#ff5252',
    },
    warning: {
      main: '#ffb74d',
    },
    info: {
      main: '#64b5f6',
    },
    success: {
      main: '#69f0ae',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
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
          boxShadow: '0 4px 14px 0 rgba(0,0,0,0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(61, 180, 242, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #3f88f2 30%, #00e5ff 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        },
      },
    },
  },
});