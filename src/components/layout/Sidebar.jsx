import React, { useState, useEffect } from 'react';
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
  IconButton,
  useMediaQuery,
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
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;
const collapsedWidth = 64;

const Sidebar = ({ userRole }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();
  
  // State to control sidebar open/close
  const [open, setOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Update open state when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

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

  // Dynamic user info based on authenticated user
  const userInfo = {
    name: user ? user.email : (userRole === 'coach' ? 'Coach Smith' : 'Alex Johnson'),
    role: user ? (userRole === 'coach' ? 'Head Coach' : 'Athlete') : (userRole === 'coach' ? 'Head Coach' : 'Athlete'),
    avatar: user ? `/static/images/avatar/${user.uid?.slice(-1) || '1'}.jpg` : '/static/images/avatar/1.jpg',
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'hidden' }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: open ? 'space-between' : 'center'
      }}>
        {open && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SportsIcon sx={{ mr: 1, color: 'primary.main', fontSize: isSmallScreen ? 24 : 32 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #3f88f2 30%, #00e5ff 90%)'
                    : 'linear-gradient(45deg, #2979ff 30%, #00b0ff 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: isSmallScreen ? '1.2rem' : '1.5rem',
                }}
              >
                CoachAI
              </Typography>
            </Box>
            {!isMobile && (
              <IconButton onClick={handleDrawerToggle} edge="end">
                <ChevronLeftIcon />
              </IconButton>
            )}
          </>
        )}
        {!open && !isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ my: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {open && (
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={userInfo.avatar}
            alt={userInfo.name}
            sx={{ width: isSmallScreen ? 36 : 48, height: isSmallScreen ? 36 : 48, mr: 1.5 }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}>
              {userInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isSmallScreen ? '0.75rem' : '0.875rem' }}>
              {userInfo.role}
            </Typography>
          </Box>
        </Box>
      )}

      {!open && !isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.5 }}>
          <Avatar
            src={userInfo.avatar}
            alt={userInfo.name}
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      )}

      <Divider />

      <List sx={{ flex: 1, pt: isSmallScreen ? 1 : 2, px: 1 }}>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              selected={isActive(item.path)}
              sx={{
                borderRadius: '8px',
                mx: 0.5,
                px: open ? 2 : 1,
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
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
                  minWidth: open ? 36 : 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive(item.path) ? 'white' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: isSmallScreen ? '0.875rem' : '1rem',
                    noWrap: true
                  }} 
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List sx={{ py: 1, px: 1 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={logout}
            sx={{
              borderRadius: '8px',
              mx: 0.5,
              px: open ? 2 : 1,
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: open ? 36 : 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && (
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ 
                  fontSize: isSmallScreen ? '0.875rem' : '1rem',
                  noWrap: true
                }} 
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer - temporary */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
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
        >
          {drawer}
        </Drawer>
      )}

      {/* Desktop drawer - persistent but collapsible */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
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
        >
          {drawer}
        </Drawer>
      )}
      
      {/* Mobile toggle button - shown only on mobile */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1199,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default Sidebar;