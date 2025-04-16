import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Schedule } from '@mui/icons-material';

const TrainingSchedule = ({ userRole }) => {
  const theme = useTheme();

  const mockSchedule = [
    { day: 'Monday', time: '6:00 PM', activity: 'Strength Training' },
    { day: 'Wednesday', time: '5:30 PM', activity: 'Technique Drills' },
    { day: 'Friday', time: '6:00 PM', activity: 'Match Practice' },
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
        Training Schedule
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your upcoming training sessions
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
                Weekly Schedule
              </Typography>
              <List>
                {mockSchedule.map((session, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${session.day} - ${session.time}`}
                      secondary={session.activity}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <Schedule color="primary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingSchedule;