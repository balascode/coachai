import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material';
import { Person } from '@mui/icons-material';

const PlayerProfile = ({ userRole }) => {
  const theme = useTheme();

  const mockProfile = {
    name: 'Alex Johnson',
    role: 'Athlete',
    sport: 'Tennis',
    experience: '5 years',
    achievements: ['Regional Champion 2024', 'National Qualifier 2023'],
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
        Player Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your personal details and achievements
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 2,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  <Person fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h6">{mockProfile.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mockProfile.role}
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Sport
                  </Typography>
                  <Typography variant="body1">{mockProfile.sport}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Experience
                  </Typography>
                  <Typography variant="body1">{mockProfile.experience}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Achievements
                  </Typography>
                  {mockProfile.achievements.map((achievement, index) => (
                    <Typography key={index} variant="body1">
                      - {achievement}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerProfile;