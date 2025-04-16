import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  IconButton,
} from '@mui/material';
import { Feedback } from '@mui/icons-material';

const FeedbackCard = ({ title, message, severity = 'info' }) => {
  const theme = useTheme();

  const severityColors = {
    info: theme.palette.info.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${theme.palette.divider}`,
        mb: 2,
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Feedback sx={{ color: severityColors[severity], mr: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Box>
        <IconButton>
          <Feedback color={severity} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;