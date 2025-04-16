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

const PlayerList = ({ userRole }) => {
  const theme = useTheme();

  const mockPlayers = [
    { name: 'Alex Johnson', role: 'Athlete', sport: 'Tennis' },
    { name: 'Sarah Lee', role: 'Athlete', sport: 'Tennis' },
    { name: 'Mike Brown', role: 'Athlete', sport: 'Tennis' },
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
        Player List
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your team members
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {mockPlayers.map((player, index) => (
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{player.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {player.role} - {player.sport}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerList;