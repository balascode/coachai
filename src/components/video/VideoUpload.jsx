import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Grid,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  CheckCircleOutline,
  Error,
  Videocam,
} from '@mui/icons-material';

const VideoUpload = ({ title, subtitle, onVideoUploaded }) => {
  const theme = useTheme();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }

    setVideoFile(file);
    setError(null);
    uploadVideo(file);
  };

  const uploadVideo = (file) => {
    setUploading(true);
    setUploadProgress(0);

    const fileUrl = URL.createObjectURL(file);
    setVideoUrl(fileUrl);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 5;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            if (onVideoUploaded) {
              onVideoUploaded(fileUrl);
            }
          }, 500);
          return 100;
        }

        return newProgress;
      });
    }, 150);
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setUploadProgress(0);
    setUploading(false);
    setError(null);

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };



  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }

      setVideoFile(file);
      setError(null);
      uploadVideo(file);
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title || 'Upload Video'}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}

        <Box
          sx={{
            flex: 1,
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!videoUrl ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                border: `2px dashed ${error ? theme.palette.error.main : theme.palette.divider}`,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
                cursor: 'pointer',
                backgroundColor: theme.palette.background.default,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(63, 136, 242, 0.1)'
                    : 'rgba(41, 121, 255, 0.05)',
                },
              }}
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {error ? (
                <Error sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
              ) : (
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              )}

              <Typography
                variant="body1"
                textAlign="center"
                color={error ? 'error' : 'textSecondary'}
              >
                {error || 'Drag and drop your video file here, or click to browse'}
              </Typography>

              <Button
                variant="outlined"
                color={error ? 'error' : 'primary'}
                sx={{ mt: 2, borderRadius: 3 }}
                startIcon={<Videocam />}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current.click();
                }}
              >
                Select Video
              </Button>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="video/*"
                onChange={handleFileChange}
              />

              <Typography variant="caption" sx={{ mt: 2, textAlign: 'center' }}>
                Supported formats: MP4, MOV, WEBM (max 100MB)
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: 'black',
              }}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />

              {uploading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={uploadProgress}
                    size={60}
                    thickness={4}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="white">
                    Uploading {uploadProgress}%
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  display: 'flex',
                  gap: 1,
                }}
              >
                {!uploading && (
                  <Tooltip title="Delete Video">
                    <IconButton
                      onClick={clearVideo}
                      sx={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255,0,0,0.5)',
                        },
                      }}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          )}
        </Box>

        {!uploading && videoUrl && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <CheckCircleOutline sx={{ color: 'success.main', mr: 1 }} />
            <Typography variant="body2" color="success.main">
              Video uploaded successfully
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUpload;