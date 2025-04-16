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

const VideoAnalysis = ({ userRole }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [coachVideoUrl, setCoachVideoUrl] = useState(null);
  const [playerVideoUrl, setPlayerVideoUrl] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const steps = [
    { label: 'Upload Videos', icon: <FileUpload /> },
    { label: 'Compare & Analyze', icon: <CompareArrows /> },
    { label: 'View Results', icon: <Assessment /> },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCoachVideoUrl(null);
    setPlayerVideoUrl(null);
    setAnalysisResults(null);
  };

  const handleCoachVideoUploaded = (url) => {
    setCoachVideoUrl(url);
  };

  const handlePlayerVideoUploaded = (url) => {
    setPlayerVideoUrl(url);
  };

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {(userRole === 'coach' || !userRole) && (
              <Grid item xs={12} md={6}>
                <VideoUpload
                  title="Upload Coach Video"
                  subtitle="Upload a demonstration video showing the correct technique"
                  onVideoUploaded={handleCoachVideoUploaded}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <VideoUpload
                title="Upload Player Video"
                subtitle="Upload your performance video for analysis"
                onVideoUploaded={handlePlayerVideoUploaded}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return coachVideoUrl && playerVideoUrl ? (
          <VideoComparison
            coachVideo={coachVideoUrl}
            playerVideo={playerVideoUrl}
            onAnalysisComplete={handleAnalysisComplete}
          />
        ) : (
          <Typography color="error">
            Please upload both coach and player videos to proceed.
          </Typography>
        );
      case 2:
        return analysisResults ? (
          <AnalysisReport results={analysisResults} userRole={userRole} />
        ) : (
          <Typography color="error">
            No analysis results available. Please complete the analysis step.
          </Typography>
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
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Performance Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Utilize AI-driven video analysis to optimize your sports performance
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                icon={step.icon}
                sx={{
                  '& .MuiStepIcon-root': {
                    color: theme.palette.primary.main,
                    '&.Mui-active': {
                      color: theme.palette.secondary.main,
                    },
                    '&.Mui-completed': {
                      color: theme.palette.success.main,
                    },
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '400px' }}>{getStepContent(activeStep)}</Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ borderRadius: 3 }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={<Done />}
                onClick={handleReset}
                sx={{ borderRadius: 3, px: 4 }}
              >
                Start New Analysis
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<ArrowForward />}
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && (!coachVideoUrl || !playerVideoUrl)) ||
                  (activeStep === 1 && !analysisResults)
                }
                sx={{ borderRadius: 3, px: 4 }}
              >
                {activeStep === 1 ? 'Analyze' : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default VideoAnalysis;