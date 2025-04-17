import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Divider,
  useTheme,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  FileUpload,
  CompareArrows,
  Assessment,
  Done,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import VideoUpload from './VideoUpload';
import VideoComparison from './VideoComparison';
import AnalysisReport from '../reports/AnalysisReport';
import { auth } from '../../firebaseConfig';

const VideoAnalysis = ({ userRole }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [coachVideo, setCoachVideo] = useState({ url: null, id: null });
  const [playerVideo, setPlayerVideo] = useState({ url: null, id: null });
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState({
    upload: false,
    analysis: false,
  });
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const steps = [
    { label: 'Upload Videos', icon: <FileUpload /> },
    { label: 'Compare & Analyze', icon: <CompareArrows /> },
    { label: 'View Results', icon: <Assessment /> },
  ];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    setCoachVideo({ url: null, id: null });
    setPlayerVideo({ url: null, id: null });
    setAnalysisResults(null);
    setError(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleVideoUpload = async (file, isCoach) => {
    setLoading((prev) => ({ ...prev, upload: true }));
    setError(null);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('userId', auth.currentUser?.uid || 'testUserId');
    formData.append('isCoach', isCoach);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload response:', data);

      if (data.success) {
        const videoUrl = data.videoUrl;
        console.log(`Setting ${isCoach ? 'coach' : 'player'} video URL:`, videoUrl);

        if (isCoach) {
          setCoachVideo({ url: videoUrl, id: data.videoId });
          setSnackbarOpen(true);
        } else {
          setPlayerVideo({ url: videoUrl, id: data.videoId });
          if (coachVideo.url) {
            setSnackbarOpen(true);
            setTimeout(handleNext, 1000);
          }
        }
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      setError(`Upload failed: ${error.message}`);
      console.error('Upload error:', error);
    } finally {
      setLoading((prev) => ({ ...prev, upload: false }));
    }
  };

  const handleAnalysisComplete = async () => {
    setLoading((prev) => ({ ...prev, analysis: true }));
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coachVideoId: coachVideo.id,
          playerVideoId: playerVideo.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Analysis response:', data);

      if (data.success) {
        setAnalysisResults(data);
        handleNext();
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error) {
      setError(`Analysis failed: ${error.message}`);
      console.error('Analysis error:', error);
    } finally {
      setLoading((prev) => ({ ...prev, analysis: false }));
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <VideoUpload
                title="Upload Coach Video"
                subtitle="Upload a demonstration video"
                onVideoUploaded={(file) => handleVideoUpload(file, true)}
                disabled={loading.upload}
                completed={!!coachVideo.url}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <VideoUpload
                title="Upload Player Video"
                subtitle="Upload your performance video"
                onVideoUploaded={(file) => handleVideoUpload(file, false)}
                disabled={loading.upload || !coachVideo.url}
                completed={!!playerVideo.url}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return coachVideo.url && playerVideo.url ? (
          <VideoComparison
            coachVideo={coachVideo.url}
            playerVideo={playerVideo.url}
            normalVideoUrl={analysisResults?.normalVideoUrl}
            dynamicVideoUrl={analysisResults?.dynamicVideoUrl}
            onAnalysisComplete={handleAnalysisComplete}
            loading={loading.analysis}
          />
        ) : (
          <Typography color="error">Please upload both videos to proceed.</Typography>
        );
      case 2:
        return analysisResults ? (
          <AnalysisReport
            results={analysisResults}
            userRole={userRole}
            onReset={handleReset} // Pass onReset prop
          />
        ) : (
          <Typography color="error">No results available. Please analyze.</Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '2.125rem' },
          }}
        >
          Performance Analysis
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Optimize your sports performance
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            flexWrap: 'wrap',
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
          }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {loading.upload && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 2,
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Uploading video...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box sx={{ minHeight: '400px' }}>{getStepContent(activeStep)}</Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Button
            disabled={activeStep === 0 || loading.upload || loading.analysis}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ borderRadius: 3 }}
          >
            Back
          </Button>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={<Done />}
                onClick={handleReset}
                disabled={loading.upload || loading.analysis}
                sx={{ borderRadius: 3, px: 4 }}
              >
                Start New Analysis
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<ArrowForward />}
                onClick={activeStep === 1 ? handleAnalysisComplete : handleNext}
                disabled={
                  (activeStep === 0 && (!coachVideo.url || !playerVideo.url)) ||
                  loading.upload ||
                  loading.analysis
                }
                sx={{ borderRadius: 3, px: 4 }}
              >
                {activeStep === 1 ? (loading.analysis ? 'Analyzing...' : 'Analyze') : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          coachVideo.url && !playerVideo.url
            ? 'Coach video uploaded successfully! Now upload your performance video.'
            : 'Both videos uploaded successfully!'
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default VideoAnalysis;