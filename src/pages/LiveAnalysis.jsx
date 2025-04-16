import React from 'react';
import { Container } from '@mui/material';
import LiveAnalysis from '../components/LiveAnalysis/LiveAnalysis';

const Live = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <LiveAnalysis/>
    </Container>
  );
};

export default Live;