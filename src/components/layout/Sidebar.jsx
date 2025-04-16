import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CompareArrows as CompareIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Group as TeamIcon,
  Person as PlayerIcon,
  VideoCameraFront as VideoIcon,
  Schedule as ScheduleIcon,
  Logout as LogoutIcon,
  SportsKabaddi as SportsIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const Sidebar = ({ open, onClose, variant = 'persistent', userRole }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
      roles: ['coach', 'player'],
    },
    {
      text: 'Video Analysis',
      icon: <CompareIcon />,
      path: '/analysis',
      roles: ['coach', 'player'],
    },
    {
      text: 'Performance Reports',
      icon: <AssessmentIcon />,
      path: '/reports',
      roles: ['coach', 'player'],
    },
    {
      text: 'Team Overview',
      icon: <TeamIcon />,
      path: '/team',
      roles: ['coach'],
    },
    {
      text: 'Training Schedule',
      icon: <ScheduleIcon />,
      path: '/schedule',
      roles: ['coach', 'player'],
    },
    {
      text: 'Record Session',
      icon: <VideoIcon />,
      path: '/record',
      roles: ['player'],
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
      roles: ['coach', 'player'],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole || 'player')
  );

  const userInfo = {
    name: userRole === 'coach' ? 'Coach Smith' : 'Alex Johnson',
    role: userRole === 'coach' ? 'Head Coach' : 'Athlete',
    avatar: '/static/images/avatar/1.jpg',
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          backdropFilter: 'blur(10px)',
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(15, 39, 68, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          borderRight: '1px solid',
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
        },
      }}
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <SportsIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #3f88f2 30%, #00e5ff 90%)'
                : 'linear-gradient(45deg, #2979ff 30%, #00b0ff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CoachAI
          </Typography>
        </Box>

        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={userInfo.avatar}
            alt={userInfo.name}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {userInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo.role}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List sx={{ flex: 1, pt: 2 }}>
          {filteredMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (variant === 'temporary') onClose();
                }}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: '0 24px 24px 0',
                  mr: 2,
                  ml: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path) ? 'white' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: '0 24px 24px 0',
                mr: 2,
                ml: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;