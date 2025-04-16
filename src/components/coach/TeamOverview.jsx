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
import { Group } from '@mui/icons-material';

const TeamOverview = ({ userRole }) => {
  const theme = useTheme();

  const mockTeam = [
    { name: 'Alex Johnson', performance: 85 },
    { name: 'Sarah Lee', performance: 90 },
    { name: 'Mike Brown', performance: 78 },
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
        Team Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Performance metrics for your team
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {mockTeam.map((player, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                backdropFilter: 'blur(8px)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Group sx={{ mr: 1, color: theme.palette.primary.main }} />
                  {player.name}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Performance
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={player.performance}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.divider,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    {player.performance}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamOverview;