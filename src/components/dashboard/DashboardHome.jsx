import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

const DashboardHome = ({ userRole }) => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome, {userRole === 'coach' ? 'Coach' : 'Athlete'}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Explore your dashboard to track performance, analyze videos, and optimize your training.
      </Typography>
    </Container>
  );
};

export default DashboardHome;