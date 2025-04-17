import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import VideoUpload from '../video/VideoUpload';
import CameraPreview from './cameraPreview';

const LiveVideoAnalysis = () => {
  const [coachVideo, setCoachVideo] = useState({ url: null, id: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handle video upload
  const handleVideoUpload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('video', file);
      const response = await fetch('http://localhost:5001/api/live/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }
      setCoachVideo({ url: result.videoUrl, id: result.videoId });
      setSnackbarOpen(true);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Live Performance Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Upload the coach's video to enable real-time camera analysis.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Video Upload Section */}
      <Box sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
        <VideoUpload
          title="Upload Coach Video"
          subtitle="Upload the demonstration video to proceed with live analysis."
          onVideoUploaded={(file) => handleVideoUpload(file)}
          disabled={loading || !!coachVideo.url}
          completed={!!coachVideo.url}
        />
      </Box>

      {/* Camera Preview Section */}
      <Box>
        <CameraPreview disabled={!coachVideo.url} coachVideoId={coachVideo.id} />
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mt: 2, maxWidth: '800px', mx: 'auto' }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Coach video uploaded successfully! You can now start the live camera."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default LiveVideoAnalysis;