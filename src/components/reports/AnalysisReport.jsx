import React, { useState, useEffect } from 'react';
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
  Button,
  Link,
  Alert,
} from '@mui/material';
import {
  Warning,
  Lightbulb,
  Videocam,
  Sports,
  Assessment,
  Info,
  TableChart,
  BarChart,
  Refresh,
} from '@mui/icons-material';

const AnalysisReport = ({ results, userRole, onReset }) => {
  const theme = useTheme();
  const [videoError, setVideoError] = useState(null);

  useEffect(() => {
    console.log('AnalysisReport results:', results);
    // Test if plot images load
    if (results?.avgErrorPlotUrl) {
      fetch(results.avgErrorPlotUrl)
        .then((response) => {
          if (!response.ok) {
            console.error(`Failed to load avgErrorPlotUrl: ${response.status} ${response.statusText}`);
          } else {
            console.log('avgErrorPlotUrl loaded successfully:', results.avgErrorPlotUrl);
          }
        })
        .catch((error) => console.error('Error fetching avgErrorPlotUrl:', error));
    }
  }, [results]);

  if (!results) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No analysis results available
        </Typography>
      </Box>
    );
  }

  const {
    teacher_frames = 0,
    student_frames = 0,
    movement_accuracy = 0,
    average_differences = [],
    suggestions = [],
    overall_accuracy = 0,
    normalVideoUrl = null,
    dynamicVideoUrl = null,
    csvUrl = null,
    avgErrorPlotUrl = null,
    jointErrorPlotUrls = [],
    region_scores = {},
  } = results;

  const formattedDifferences = average_differences.map((diff, index) => ({
    landmark: `Landmark ${index + 1}`,
    value: diff ? diff.toFixed(6) : 'N/A',
  }));

  const handleRetry = () => {
    if (onReset) {
      onReset(); // Reset to start a new analysis
    } else {
      window.location.reload(); // Fallback: reload the page
    }
  };

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

      {videoError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setVideoError(null)}>
          {videoError}
          <Button
            variant="outlined"
            size="small"
            startIcon={<Refresh />}
            onClick={handleRetry}
            sx={{ ml: 2 }}
          >
            Retry Analysis
          </Button>
        </Alert>
      )}

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

      {/* Region Scores */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Assessment sx={{ mr: 1, color: theme.palette.primary.main }} />
            Per-Region Error Scores
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(region_scores).map(([region, score]) => (
              <Grid item xs={12} sm={4} key={region}>
                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                  {region.replace('_', ' ')}: {score.toFixed(3)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Comparison Videos Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Videocam sx={{ mr: 1, color: theme.palette.primary.main }} />
            Comparison Videos
          </Typography>
          <Grid container spacing={2}>
            {normalVideoUrl ? (
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  Normal Comparison
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <video
                    controls
                    preload="metadata"
                    style={{ width: '100%', backgroundColor: theme.palette.grey[900] }}
                    onError={(e) => {
                      const errorMsg = e.target.error
                        ? `Failed to load normal comparison video: ${e.target.error.message}`
                        : 'Failed to load normal comparison video: Unable to access video file. Please check server logs.';
                      setVideoError(errorMsg);
                      console.error('Normal video load error:', e.target.error || 'Unknown error', 'URL:', normalVideoUrl);
                    }}
                    onLoadedData={() => console.log('Normal video loaded successfully:', normalVideoUrl)}
                  >
                    <source src={normalVideoUrl} type="video/mp4" />
                    <Typography variant="body2" color="error">
                      Your browser cannot play this video. Please try a different browser or contact support.
                    </Typography>
                  </video>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="error">
                  Normal comparison video not available.
                </Typography>
              </Grid>
            )}
            {dynamicVideoUrl ? (
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  Dynamic Comparison
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <video
                    controls
                    preload="metadata"
                    style={{ width: '100%', backgroundColor: theme.palette.grey[900] }}
                    onError={(e) => {
                      const errorMsg = e.target.error
                        ? `Failed to load dynamic comparison video: ${e.target.error.message}`
                        : 'Failed to load dynamic comparison video: Unable to access video file. Please check server logs.';
                      setVideoError(errorMsg);
                      console.error('Dynamic video load error:', e.target.error || 'Unknown error', 'URL:', dynamicVideoUrl);
                    }}
                    onLoadedData={() => console.log('Dynamic video loaded successfully:', dynamicVideoUrl)}
                  >
                    <source src={dynamicVideoUrl} type="video/mp4" />
                    <Typography variant="body2" color="error">
                      Your browser cannot play this video. Please try a different browser or contact support.
                    </Typography>
                  </video>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="error">
                  Dynamic comparison video not available.
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* CSV Download */}
      {csvUrl && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TableChart sx={{ mr: 1, color: theme.palette.primary.main }} />
              Detailed Differences
            </Typography>
            <Button
              variant="outlined"
              href={csvUrl}
              download
              startIcon={<TableChart />}
              sx={{ mt: 1 }}
              onError={(e) => console.error('CSV download error:', e, 'URL:', csvUrl)}
            >
              Download CSV
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Average Error Plot */}
      {avgErrorPlotUrl && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <BarChart sx={{ mr: 1, color: theme.palette.primary.main }} />
              Average Error per Joint
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 1,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <img
                src={avgErrorPlotUrl}
                alt="Average Error per Joint"
                style={{ maxWidth: '100%', height: 'auto' }}
                onError={(e) => console.error('Average error plot load error:', e.target.error, 'URL:', avgErrorPlotUrl)}
                onLoad={() => console.log('Average error plot loaded successfully:', avgErrorPlotUrl)}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Joint Error Plots */}
      {jointErrorPlotUrls.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <BarChart sx={{ mr: 1, color: theme.palette.primary.main }} />
              Joint Errors Over Time
            </Typography>
            <Grid container spacing={2}>
              {jointErrorPlotUrls.map((url, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Typography variant="body2" gutterBottom>
                    {url.split('_').pop().replace('.png', '')}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <img
                      src={url}
                      alt={`Error over time for ${url.split('_').pop().replace('.png', '')}`}
                      style={{ maxWidth: '100%', height: 'auto' }}
                      onError={(e) => console.error('Joint error plot load error:', e.target.error, 'URL:', url)}
                      onLoad={() => console.log('Joint error plot loaded successfully:', url)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
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
                          parseFloat(row.value) > 0.1
                            ? 'error'
                            : parseFloat(row.value) > 0.05
                            ? 'warning'
                            : 'success'
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
            <Paper
              sx={{
                p: 2,
                backgroundColor: theme.palette.success.light,
                color: theme.palette.success.dark,
              }}
            >
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