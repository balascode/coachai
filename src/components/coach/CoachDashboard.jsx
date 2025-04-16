import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Chip,
} from '@mui/material';
import { Group, TrendingUp } from '@mui/icons-material';
import PerformanceMetrics from '../dashboard/PerformanceMetrics';
import ActivityFeed from '../dashboard/ActivityFeed';

const CoachDashboard = ({ userRole }) => {
  const theme = useTheme();

  const mockData = {
    teamPerformance: '88%',
    sessionCount: 15,
    commonMistakes: ['Elbow angle', 'Follow-through'],
    recentActivities: [
      { id: 1, action: 'Reviewed player analysis', time: '1 hour ago' },
      { id: 2, action: 'Scheduled new session', time: 'Today' },
    ],
  };

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
        Coach Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Overview of team performance and activities
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
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
                Team Metrics
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Team Performance
                  </Typography>
                  <Typography variant="h5">{mockData.teamPerformance}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Group sx={{ mr: 1, color: theme.palette.secondary.main }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Sessions This Month
                  </Typography>
                  <Typography variant="h5">{mockData.sessionCount}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <PerformanceMetrics userRole={userRole} />
        </Grid>

        <Grid item xs={12}>
          <ActivityFeed activities={mockData.recentActivities} />
        </Grid>

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
                Common Team Mistakes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {mockData.commonMistakes.map((mistake, index) => (
                  <Chip
                    key={index}
                    label={mistake}
                    color="error"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoachDashboard;