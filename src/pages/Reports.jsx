import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import AnalysisReport from '../components/reports/AnalysisReport';
import SessionReport from '../components/reports/SessionReport';
import ProgressTracker from '../components/reports/ProgressTracker';

const Reports = ({ userRole }) => {
  const theme = useTheme();

  const mockResults = {
    performance: 85,
    technique: 78,
    accuracy: 92,
    suggestions: [
      'Keep your elbow higher during the backswing motion',
      'Maintain a more consistent follow-through',
      'Work on the timing between upper and lower body',
    ],
  };

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
        Performance Reports
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Detailed analysis and progress tracking
      </Typography>

      <Box sx={{ mt: 4 }}>
        <AnalysisReport results={mockResults} userRole={userRole} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <SessionReport userRole={userRole} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <ProgressTracker userRole={userRole} />
      </Box>
    </Container>
  );
};

export default Reports;