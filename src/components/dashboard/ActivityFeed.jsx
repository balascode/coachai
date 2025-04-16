import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { History } from '@mui/icons-material';

const ActivityFeed = ({ activities }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List dense>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemIcon>
                <History color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={activity.action}
                secondary={activity.time}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;