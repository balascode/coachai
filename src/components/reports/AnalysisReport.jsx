import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  Lightbulb,
  Group,
} from '@mui/icons-material';

const AnalysisReport = ({ results, userRole }) => {
  const theme = useTheme();

  const sessionData = userRole === 'coach' ? {
    totalPlayers: 12,
    sessionDuration: '1h 30m',
    commonMistakes: [
      { mistake: 'Incorrect elbow angle', frequency: '65%' },
      { mistake: 'Poor follow-through', frequency: '50%' },
      { mistake: 'Misaligned posture', frequency: '45%' },
    ],
    practiceTime: '4 hours/week',
  } : null;

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
        Analysis Results
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Detailed insights from your performance analysis
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
                Performance Metrics
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Overall Performance"
                    secondary={`${results.performance}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Technique"
                    secondary={`${results.technique}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Accuracy"
                    secondary={`${results.accuracy}%`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

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
                Improvement Suggestions
              </Typography>
              <List dense>
                {results.suggestions.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Lightbulb color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

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
                Detected Posture Issues
              </Typography>
              <List dense>
                {results.suggestions.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary={suggestion.split(' ').slice(0, 3).join(' ')} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {userRole === 'coach' && sessionData && (
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
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Group sx={{ mr: 1, color: theme.palette.primary.main }} />
                  Session Report
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      Total Players
                    </Typography>
                    <Typography variant="h6">{sessionData.totalPlayers}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      Session Duration
                    </Typography>
                    <Typography variant="h6">{sessionData.sessionDuration}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">
                      Practice Time
                    </Typography>
                    <Typography variant="h6">{sessionData.practiceTime}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Common Mistakes
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {sessionData.commonMistakes.map((mistake, index) => (
                        <Chip
                          key={index}
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
        )}
      </Grid>
    </Box>
  );
};

export default AnalysisReport;