import React, { useState } from 'react';
import { Box, Slider, Typography, useTheme } from '@mui/material';

const ComparisonSlider = ({ beforeImage, afterImage }) => {
  const theme = useTheme();
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
      <Box
        component="img"
        src={beforeImage}
        alt="Before"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        component="img"
        src={afterImage}
        alt="After"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${sliderValue}%`,
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Slider
        value={sliderValue}
        onChange={(_, newValue) => setSliderValue(newValue)}
        sx={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          color: theme.palette.primary.main,
        }}
      />
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          px: 1,
          borderRadius: 1,
        }}
      >
        Before
      </Typography>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.5)',
          px: 1,
          borderRadius: 1,
        }}
      >
        After
      </Typography>
    </Box>
  );
};

export default ComparisonSlider;