import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

const Home = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to CoachAI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          Optimize your sports performance with AI-driven analysis
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;