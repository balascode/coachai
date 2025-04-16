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
  LinearProgress,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material';
import {
  Warning,
  Lightbulb,
  Videocam,
  Sports,
  Assessment,
  Info,
} from '@mui/icons-material';

const AnalysisReport = ({ results, userRole }) => {
  const theme = useTheme();

  if (!results) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No analysis results available
        </Typography>
      </Box>
    );
  }

  // Extract data from results or use defaults
  const {
    teacher_frames = 0,
    student_frames = 0,
    movement_accuracy = 0,
    average_differences = [],
    suggestions = [],
    overall_accuracy = 0,
    comparisonVideoUrl = null,
  } = results;

  // Format the average differences for display
  const formattedDifferences = average_differences.map((diff, index) => ({
    landmark: `Landmark ${index + 1}`,
    value: diff ? diff.toFixed(6) : 'N/A',
  }));

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
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
        Pose Analysis Report
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Key Metrics Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Sports sx={{ mr: 1, color: theme.palette.primary.main }} />
                Frame Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Teacher frames with keypoints: {teacher_frames}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Student frames with keypoints: {student_frames}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Assessment sx={{ mr: 1, color: theme.palette.success.main }} />
                Movement Accuracy
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" color="primary">
                  {movement_accuracy}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={movement_accuracy}
                  sx={{
                    flexGrow: 1,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[300],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        movement_accuracy > 75
                          ? theme.palette.success.main
                          : movement_accuracy > 50
                          ? theme.palette.warning.main
                          : theme.palette.error.main,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Assessment sx={{ mr: 1, color: theme.palette.info.main }} />
                Overall Pose Accuracy
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" color="primary">
                  {overall_accuracy}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={overall_accuracy}
                  sx={{
                    flexGrow: 1,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[900],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        overall_accuracy > 75
                          ? theme.palette.success.main
                          : overall_accuracy > 50
                          ? theme.palette.warning.main
                          : theme.palette.error.main,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Comparison Video Section */}
      {comparisonVideoUrl && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Videocam sx={{ mr: 1, color: theme.palette.primary.main }} />
              Comparison Video
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              borderRadius: 1,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`
            }}>
              <video
                controls
                style={{ 
                  width: '100%', 
                  maxWidth: '800px',
                  backgroundColor: theme.palette.grey[900]
                }}
                onError={(e) => {
                  console.error('Comparison video load error:', e.target.error, 'URL:', comparisonVideoUrl);
                }}
                onLoadedData={() => console.log('Comparison video loaded:', comparisonVideoUrl)}
              >
                <source src={comparisonVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Average Differences Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Info sx={{ mr: 1, color: theme.palette.primary.main }} />
            Average Differences by Landmark
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Landmark</TableCell>
                  <TableCell align="right">Difference Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedDifferences.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.landmark}
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={row.value} 
                        size="small"
                        color={
                          parseFloat(row.value) > 0.1 ? 'error' : 
                          parseFloat(row.value) > 0.05 ? 'warning' : 'success'
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Improvement Suggestions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Lightbulb sx={{ mr: 1, color: theme.palette.warning.main }} />
            Tips for Improvement
          </Typography>
          {suggestions.length > 0 ? (
            <List dense>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Warning color="error" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={suggestion} 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Paper sx={{ 
              p: 2, 
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark
            }}>
              <Typography variant="body2">
                Great job! Your form matches the coach's demonstration well. Keep practicing to maintain consistency.
              </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalysisReport;