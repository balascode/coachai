import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Slider,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Replay,
  SkipNext,
  SkipPrevious,
  Compare,
  GridOn,
  GridOff,
  Timeline,
  FullscreenExit,
  Fullscreen,
  Person,
} from '@mui/icons-material';

const VideoComparison = ({ coachVideo, playerVideo, comparisonVideo, onAnalysisComplete, loading }) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(null);

  const coachVideoRef = useRef(null);
  const playerVideoRef = useRef(null);
  const comparisonVideoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('VideoComparison props:', { coachVideo, playerVideo, comparisonVideo, loading });

    if (coachVideoRef.current && playerVideoRef.current) {
      coachVideoRef.current.onloadedmetadata = () => {
        setDuration(coachVideoRef.current.duration);
        console.log('Coach video duration:', coachVideoRef.current.duration);
      };

      const updateTime = () => {
        if (coachVideoRef.current) {
          setCurrentTime(coachVideoRef.current.currentTime);
        }
      };

      coachVideoRef.current.addEventListener('timeupdate', updateTime);

      coachVideoRef.current.addEventListener('play', () => {
        console.log('Playing videos');
        if (playerVideoRef.current) {
          playerVideoRef.current.currentTime = coachVideoRef.current.currentTime;
          playerVideoRef.current.play();
        }
        if (comparisonVideoRef.current && showSkeleton) {
          comparisonVideoRef.current.currentTime = coachVideoRef.current.currentTime;
          comparisonVideoRef.current.play();
        }
        setIsPlaying(true);
      });

      coachVideoRef.current.addEventListener('pause', () => {
        console.log('Pausing videos');
        if (playerVideoRef.current) {
          playerVideoRef.current.pause();
        }
        if (comparisonVideoRef.current) {
          comparisonVideoRef.current.pause();
        }
        setIsPlaying(false);
      });

      coachVideoRef.current.addEventListener('seeked', () => {
        console.log('Seeking videos to:', coachVideoRef.current.currentTime);
        if (playerVideoRef.current) {
          playerVideoRef.current.currentTime = coachVideoRef.current.currentTime;
        }
        if (comparisonVideoRef.current) {
          comparisonVideoRef.current.currentTime = coachVideoRef.current.currentTime;
        }
      });

      coachVideoRef.current.addEventListener('error', () => {
        setVideoError('Error loading coach video.');
        console.error('Coach video error');
      });

      playerVideoRef.current.addEventListener('error', () => {
        setVideoError('Error loading player video.');
        console.error('Player video error');
      });

      if (comparisonVideoRef.current) {
        comparisonVideoRef.current.addEventListener('error', () => {
          setVideoError('Error loading comparison video. Please try analyzing again.');
          console.error('Comparison video error:', comparisonVideo);
        });
        comparisonVideoRef.current.addEventListener('loadeddata', () => {
          console.log('Comparison video loaded successfully:', comparisonVideo);
        });
      }

      return () => {
        if (coachVideoRef.current) {
          coachVideoRef.current.removeEventListener('timeupdate', updateTime);
        }
      };
    }
  }, [coachVideo, playerVideo, comparisonVideo, showSkeleton]);

  const togglePlay = () => {
    if (coachVideoRef.current) {
      if (isPlaying) {
        coachVideoRef.current.pause();
      } else {
        coachVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (_, newValue) => {
    if (coachVideoRef.current) {
      coachVideoRef.current.currentTime = (newValue / 100) * duration;
      setCurrentTime(coachVideoRef.current.currentTime);

      if (playerVideoRef.current) {
        playerVideoRef.current.currentTime = coachVideoRef.current.currentTime;
      }
      if (comparisonVideoRef.current) {
        comparisonVideoRef.current.currentTime = coachVideoRef.current.currentTime;
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const skipForward = () => {
    if (coachVideoRef.current) {
      coachVideoRef.current.currentTime = Math.min(coachVideoRef.current.currentTime + 5, duration);
    }
  };

  const skipBackward = () => {
    if (coachVideoRef.current) {
      coachVideoRef.current.currentTime = Math.max(coachVideoRef.current.currentTime - 5, 0);
    }
  };

  const restartVideo = () => {
    if (coachVideoRef.current) {
      coachVideoRef.current.currentTime = 0;
      setCurrentTime(0);

      if (playerVideoRef.current) {
        playerVideoRef.current.currentTime = 0;
      }
      if (comparisonVideoRef.current) {
        comparisonVideoRef.current.currentTime = 0;
      }
    }
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const toggleSkeleton = () => {
    setShowSkeleton(!showSkeleton);
    console.log('Skeleton toggle:', !showSkeleton);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setProgress(0);

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setAnalysisComplete(true);
        setAnalyzing(false);
        onAnalysisComplete();
      }
    }, 100);
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
      ref={containerRef}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, backgroundColor: theme.palette.background.default }}>
          <Typography variant="h6" fontWeight="bold">
            Video Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Compare your form with a professional
          </Typography>
        </Box>

        {videoError && (
          <Alert severity="error" sx={{ m: 2 }} onClose={() => setVideoError(null)}>
            {videoError}
          </Alert>
        )}

        <Grid container spacing={0}>
          <Grid item xs={12} sx={{ backgroundColor: 'black' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                position: 'relative',
                width: '100%',
                height: { xs: 'auto', md: 400 },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  position: 'relative',
                  borderRight: { md: '1px solid rgba(255,255,255,0.2)' },
                  borderBottom: { xs: '1px solid rgba(255,255,255,0.2)', md: 'none' },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '2px 8px',
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  COACH
                </Typography>
                <video
                  ref={coachVideoRef}
                  src={coachVideo}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  loading="lazy"
                />
                {showGrid && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </Box>

              <Box
                sx={{
                  flex: 1,
                  position: 'relative',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '2px 8px',
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  YOU
                </Typography>
                <video
                  ref={playerVideoRef}
                  src={playerVideo}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  loading="lazy"
                />
                {showGrid && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '50px 50px',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ backgroundColor: 'black', mt: 2, position: 'relative' }}>
            {comparisonVideo ? (
              <>
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '2px 8px',
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  COMPARISON WITH SKELETONS
                </Typography>
                <video
                  ref={comparisonVideoRef}
                  src={comparisonVideo}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', display: showSkeleton ? 'block' : 'none' }}
                  controls={false}
                  muted
                  loading="lazy"
                  onError={() => console.error('Failed to load comparison video:', comparisonVideo)}
                />
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  color: 'white',
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress sx={{ color: 'white' }} />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Generating comparison video...
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">
                    Click "Analyze Performance" to generate the comparison video.
                  </Typography>
                )}
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {formatTime(currentTime)}
                </Typography>
                <Slider
                  size="small"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSliderChange}
                  sx={{ mx: 2, flex: 1 }}
                  aria-label="Video playback progress"
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {formatTime(duration)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Restart">
                    <IconButton onClick={restartVideo} aria-label="Restart video">
                      <Replay />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Previous 5s">
                    <IconButton onClick={skipBackward} aria-label="Skip backward 5 seconds">
                      <SkipPrevious />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
                    <IconButton
                      onClick={togglePlay}
                      color="primary"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Next 5s">
                    <IconButton onClick={skipForward} aria-label="Skip forward 5 seconds">
                      <SkipNext />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={showGrid ? 'Hide Grid' : 'Show Grid'}>
                    <IconButton onClick={toggleGrid} aria-label={showGrid ? 'Hide grid' : 'Show grid'}>
                      {showGrid ? <GridOff /> : <GridOn />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={showSkeleton ? 'Hide Skeletons' : 'Show Skeletons'}>
                    <IconButton
                      onClick={toggleSkeleton}
                      color={showSkeleton ? 'primary' : 'default'}
                      aria-label={showSkeleton ? 'Hide skeletons' : 'Show skeletons'}
                    >
                      <Person />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Timeline">
                    <IconButton aria-label="View timeline">
                      <Timeline />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                    <IconButton
                      onClick={toggleFullscreen}
                      aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                      {fullscreen ? <FullscreenExit /> : <Fullscreen />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              {!analyzing && !analysisComplete && (
                <Button
                  variant="contained"
                  startIcon={<Compare />}
                  onClick={startAnalysis}
                  disabled={loading}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                  }}
                  aria-label="Analyze performance"
                >
                  Analyze Performance
                </Button>
              )}

              {analyzing && (
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                  <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
                    Analyzing... {progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              )}

              {analysisComplete && (
                <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                  Analysis Complete! View detailed results in the next step.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VideoComparison;