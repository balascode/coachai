import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { Videocam, VideocamOff, Refresh } from '@mui/icons-material';

const CameraPreview = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  // Get available camera devices
  const getCameraDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
    }
  };

  // Start camera with selected device
  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if browser supports mediaDevices
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      const constraints = {
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: selectedDevice ? undefined : 'user'
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Verify we got video tracks
      if (stream.getVideoTracks().length === 0) {
        throw new Error('No video tracks available');
      }

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => console.log('Play error:', e));
        };
        setIsCameraActive(true);
        getCameraDevices(); // Refresh device list after permission
      }
    } catch (err) {
      console.error('Camera error:', err);
      handleCameraError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle specific camera errors
  const handleCameraError = (err) => {
    let errorMessage = 'Camera error occurred';
    
    switch(err.name) {
      case 'NotAllowedError':
        errorMessage = 'Camera access denied. Please allow camera permissions.';
        break;
      case 'NotFoundError':
        errorMessage = 'No camera found on this device.';
        break;
      case 'NotReadableError':
        errorMessage = 'Camera is already in use by another application.';
        break;
      case 'OverconstrainedError':
        errorMessage = 'Camera cannot meet the specified requirements.';
        break;
      default:
        errorMessage = `Camera error: ${err.message}`;
    }
    
    setError(errorMessage);
    setIsCameraActive(false);
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
    setError(null);
  };

  // Toggle camera
  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    getCameraDevices();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Camera Preview
        </Typography>
        
        {/* Camera Preview Area */}
        <Box sx={{
          width: '100%',
          maxWidth: '800px',
          height: '450px',
          position: 'relative',
          backgroundColor: '#000',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          {isCameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)' // Mirror effect
              }}
            />
          ) : (
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <VideocamOff sx={{ fontSize: 60, mb: 2 }} />
              <Typography>Camera is off</Typography>
            </Box>
          )}
          
          {/* Loading overlay */}
          {isLoading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)'
            }}>
              <CircularProgress size={60} />
            </Box>
          )}
        </Box>
        
        {/* Device Selection */}
        {devices.length > 1 && (
          <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <Typography variant="subtitle1" gutterBottom>
              Select Camera:
            </Typography>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              disabled={isCameraActive}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                </option>
              ))}
            </select>
          </Box>
        )}
        
        {/* Control Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color={isCameraActive ? 'error' : 'primary'}
            startIcon={isCameraActive ? <VideocamOff /> : <Videocam />}
            onClick={toggleCamera}
            disabled={isLoading}
            size="large"
          >
            {isCameraActive ? 'Stop Camera' : 'Start Camera'}
          </Button>
          
          {isCameraActive && (
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={startCamera}
              disabled={isLoading}
              size="large"
            >
              Switch Camera
            </Button>
          )}
        </Box>
        
        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: '800px' }}>
            {error}
            {error.includes('denied') && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Try refreshing the page and allowing camera permissions when prompted.
              </Typography>
            )}
          </Alert>
        )}
        
        {/* Help Text */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {isCameraActive
            ? 'Your camera is active. Video is not being recorded or stored.'
            : 'Camera will only activate when you click "Start Camera".'}
        </Typography>
      </Box>
    </Container>
  );
};

export default CameraPreview;