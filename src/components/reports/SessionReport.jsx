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
import { Group, Schedule, Warning } from '@mui/icons-material';

const SessionReport = ({ userRole }) => {
  const theme = useTheme();

  const mockSessionData = {
    totalPlayers: 12,
    sessionDuration: '1h 30m',
    practiceTime: '4 hours/week',
    commonMistakes: [
      { mistake: 'Incorrect elbow angle', frequency: '65%' },
      { mistake: 'Poor follow-through', frequency: '50%' },
      { mistake: 'Misaligned posture', frequency: '45%' },
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
        Session Report
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Overview of recent training sessions
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Total Players
                  </Typography>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Group sx={{ mr: 1, color: theme.palette.primary.main }} />
                    {mockSessionData.totalPlayers}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Session Duration
                  </Typography>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ mr: 1, color: theme.palette.secondary.main }} />
                    {mockSessionData.sessionDuration}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Practice Time
                  </Typography>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ mr: 1, color: theme.palette.success.main }} />
                    {mockSessionData.practiceTime}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Common Mistakes
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {mockSessionData.commonMistakes.map((mistake, index) => (
                      <Chip
                        key={index}
                        icon={<Warning />}
                        label={`${mistake.mistake} (${mistake.frequency})`}
                        color="error"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SessionReport;