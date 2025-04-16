import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const ProgressTracker = ({ userRole }) => {
  const theme = useTheme();

  const mockProgress = [
    { name: 'Performance', value: 85, color: theme.palette.primary.main },
    { name: 'Technique', value: 78, color: theme.palette.secondary.main },
    { name: 'Accuracy', value: 92, color: theme.palette.success.main },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Progress Tracker
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Track your improvement over time
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Progress
              </Typography>
              {mockProgress.map((metric) => (
                <Box key={metric.name} sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {metric.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ mr: 1, color: metric.color }} />
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.divider,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ ml: 2 }}>
                      {metric.value}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressTracker;