import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Speed,
  FitnessCenter,
  TrendingUp,
  Event,
} from '@mui/icons-material';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';

const Dashboard = ({ userRole }) => {
  const theme = useTheme();

  const mockData = {
    player: {
      performance: '85%',
      technique: '78%',
      accuracy: '92%',
      recentActivities: [
        { id: 1, action: 'Completed video analysis', time: '2 hours ago' },
        { id: 2, action: 'Uploaded new training video', time: 'Yesterday' },
      ],
    },
    coach: {
      teamPerformance: '88%',
      sessionCount: 15,
      commonMistakes: ['Elbow angle', 'Follow-through'],
      recentActivities: [
        { id: 1, action: 'Reviewed player analysis', time: '1 hour ago' },
        { id: 2, action: 'Scheduled new session', time: 'Today' },
      ],
    },
  };

  const data = userRole === 'coach' ? mockData.coach : mockData.player;

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
        {userRole === 'coach' ? 'Coach Dashboard' : 'Player Dashboard'}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Your performance overview and recent activities
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
                Key Metrics
              </Typography>
              {userRole === 'coach' ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Speed sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Team Performance
                      </Typography>
                      <Typography variant="h5">{data.teamPerformance}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Event sx={{ mr: 1, color: theme.palette.secondary.main }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Sessions This Month
                      </Typography>
                      <Typography variant="h5">{data.sessionCount}</Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Speed sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Performance
                      </Typography>
                      <Typography variant="h5">{data.performance}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FitnessCenter sx={{ mr: 1, color: theme.palette.secondary.main }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Technique
                      </Typography>
                      <Typography variant="h5">{data.technique}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ mr: 1, color: theme.palette.success.main }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Accuracy
                      </Typography>
                      <Typography variant="h5">{data.accuracy}</Typography>
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <PerformanceMetrics userRole={userRole} />
        </Grid>

        <Grid item xs={12}>
          <ActivityFeed activities={data.recentActivities} />
        </Grid>

        {userRole === 'coach' && (
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
                  {data.commonMistakes.map((mistake, index) => (
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
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;