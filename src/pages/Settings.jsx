import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  Button,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import ThemeToggle from '../components/layout/ThemeToggle';

const Settings = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Settings
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Customize your CoachAI experience
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Card
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <SettingsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              Appearance
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Theme
              </Typography>
              <ThemeToggle />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" sx={{ borderRadius: 3 }}>
                Save Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Settings;