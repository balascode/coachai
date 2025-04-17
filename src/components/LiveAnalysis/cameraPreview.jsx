import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { Videocam, VideocamOff, Refresh } from '@mui/icons-material';
import io from 'socket.io-client';

const CameraPreview = ({ disabled, coachVideoId }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const socketRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [processedFrame, setProcessedFrame] = useState(null);
  const [feedback, setFeedback] = useState({ accuracy: 100, tips: [] });

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
      setError('Failed to enumerate camera devices.');
    }
  };

  // Start camera
  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    setProcessedFrame(null); // Reset processed frame

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      const constraints = {
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          width: { ideal: 640 }, // Lowered resolution for compatibility
          height: { ideal: 480 },
          facingMode: selectedDevice ? undefined : 'user'
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((e) => {
            console.error('Play error:', e);
            setError('Failed to play video stream.');
          });
        };
        setIsCameraActive(true);
        getCameraDevices();

        // Initialize WebSocket
        socketRef.current = io('http://localhost:5001', { reconnection: true });
        socketRef.current.on('connect', () => {
          console.log('Connected to WebSocket');
        });
        socketRef.current.on('processed_frame', (data) => {
          console.log('Received processed frame:', data.frame.substring(0, 50));
          if (data.frame) {
            setProcessedFrame(data.frame);
          } else {
            console.warn('Empty frame data received');
          }
          setFeedback({ accuracy: data.accuracy || 100, tips: data.tips || [] });
        });
        socketRef.current.on('error', (data) => {
          console.error('WebSocket error:', data.message);
          setError(data.message);
          // Keep camera active on server error, just show raw feed
        });

        // Send frames to server
        const sendFrame = () => {
          if (!isCameraActive || !socketRef.current || !videoRef.current.videoWidth) return;
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth || 640;
          canvas.height = videoRef.current.videoHeight || 480;
          if (canvas.getContext('2d')) {
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
            const frameData = canvas.toDataURL('image/jpeg', 0.8);
            console.log('Sending frame:', frameData.substring(0, 50));
            socketRef.current.emit('live_frame', { frame: frameData, coachVideoId });
          } else {
            console.error('Canvas context unavailable');
          }
          requestAnimationFrame(sendFrame);
        };
        requestAnimationFrame(sendFrame);
      }
    } catch (err) {
      console.error('Camera error:', err);
      handleCameraError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle camera errors
  const handleCameraError = (err) => {
    let errorMessage = 'Camera error occurred';
    switch (err.name) {
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
        errorMessage = 'Camera cannot meet the specified requirements. Trying lower resolution.';
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
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsCameraActive(false);
    setError(null);
    setProcessedFrame(null);
    setFeedback({ accuracy: 100, tips: [] });
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
    return () => stopCamera();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Live Analysis Preview
      </Typography>

      {/* Camera Preview Area */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          height: '450px',
          position: 'relative',
          backgroundColor: '#000',
          borderRadius: 2,
          overflow: 'hidden',
          opacity: disabled ? 0.6 : 1
        }}
      >
        {isCameraActive && (
          processedFrame ? (
            <img
              src={processedFrame}
              alt="Processed Frame"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)' // Mirror effect
              }}
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
            />
          )
        )}
        {!isCameraActive && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            <VideocamOff sx={{ fontSize: 60, mb: 2 }} />
            <Typography>Camera is off</Typography>
          </Box>
        )}

        {/* Feedback Overlay */}
        {isCameraActive && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '8px 16px',
              borderRadius: 2,
              color: '#fff'
            }}
          >
            <Typography variant="body1">Accuracy: {feedback.accuracy.toFixed(2)}%</Typography>
          </Box>
        )}
        {isCameraActive && feedback.tips.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 50,
              right: 10,
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '8px 16px',
              borderRadius: 2,
              color: '#fff',
              maxWidth: '300px'
            }}
          >
            <Typography variant="body1" fontWeight="bold">Feedback:</Typography>
            {feedback.tips.map((tip, index) => (
              <Typography key={index} variant="body2">{tip}</Typography>
            ))}
          </Box>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)'
            }}
          >
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
            disabled={isCameraActive || disabled}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {devices.map((device) => (
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
          disabled={isLoading || disabled}
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
        {disabled
          ? 'Please upload the teacher’s video to enable live analysis.'
          : isCameraActive
          ? 'Your camera is active. Video is not being recorded or stored.'
          : 'Camera will activate when you click "Start Camera".'}
      </Typography>
    </Box>
  );
};

export default CameraPreview;