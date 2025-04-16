import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CircularProgress, Chip } from '@mui/material';
import { CloudUpload, CheckCircle } from '@mui/icons-material';

const VideoUpload = ({ title, subtitle, onVideoUploaded, disabled, completed }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      try {
        await onVideoUploaded(selectedFile);
        setSelectedFile(null);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Card sx={{ 
      borderRadius: 2, 
      backgroundColor: 'background.paper',
      opacity: disabled && !completed ? 0.6 : 1,
      position: 'relative'
    }}>
      {completed && (
        <Chip
          icon={<CheckCircle />}
          label="Uploaded"
          color="success"
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10,
            zIndex: 1
          }}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>{subtitle}</Typography>
        <Box sx={{ mt: 2 }}>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ display: 'block', marginBottom: '10px' }}
            disabled={disabled || uploading || completed}
          />
          <Button
            variant="contained"
            startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
            onClick={handleUpload}
            disabled={!selectedFile || uploading || disabled || completed}
            sx={{ borderRadius: 3 }}
          >
            {uploading ? 'Uploading...' : completed ? 'Upload Complete' : 'Upload'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;