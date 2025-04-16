import React from 'react';
import { Container } from '@mui/material';
import VideoAnalysis from '../components/video/VideoAnalysis';

const Analysis = ({ userRole }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <VideoAnalysis userRole={userRole} />
    </Container>
  );
};

export default Analysis;