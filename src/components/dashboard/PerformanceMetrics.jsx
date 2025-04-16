import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  useTheme,
} from '@mui/material';

const PerformanceMetrics = ({ userRole }) => {
  const theme = useTheme();

  const mockMetrics = {
    player: [
      { name: 'Performance', value: 85, color: theme.palette.primary.main },
      { name: 'Technique', value: 78, color: theme.palette.secondary.main },
      { name: 'Accuracy', value: 92, color: theme.palette.success.main },
    ],
    coach: [
      { name: 'Team Performance', value: 88, color: theme.palette.primary.main },
      { name: 'Session Engagement', value: 95, color: theme.palette.secondary.main },
      { name: 'Improvement Rate', value: 82, color: theme.palette.success.main },
    ],
  };

  const metrics = userRole === 'coach' ? mockMetrics.coach : mockMetrics.player;

  return (
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
          Performance Metrics
        </Typography>
        {metrics.map((metric) => (
          <Box key={metric.name} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {metric.name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={metric.value}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.palette.divider,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: metric.color,
                },
              }}
            />
            <Typography variant="caption" sx={{ mt: 0.5 }}>
              {metric.value}%
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;