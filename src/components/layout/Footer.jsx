import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { SportsKabaddi } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsKabaddi sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CoachAI
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} CoachAI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;