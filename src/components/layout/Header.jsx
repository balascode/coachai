import React, { useState, useContext } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  SportsKabaddi as SportsIcon,
} from '@mui/icons-material';
import ThemeToggle from './ThemeToggle';
import { useThemeContext } from '../../contexts/ThemeContext'; // Updated to useThemeContext
import { useAuth } from '../../contexts/AuthContext';

export default function Header({ toggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { isDarkMode } = useThemeContext(); // Updated hook
  const { user } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: isDarkMode ? 'rgba(15, 39, 68, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <SportsIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: 700,
              background: isDarkMode
                ? 'linear-gradient(45deg, #3f88f2 30%, #00e5ff 90%)'
                : 'linear-gradient(45deg, #2979ff 30%, #00b0ff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CoachAI
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <ThemeToggle />
            <Tooltip title="Account settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar
                  alt={user ? user.email : 'User Avatar'}
                  src={user ? `/static/images/avatar/${user.uid.slice(-1)}.jpg` : '/static/images/avatar/1.jpg'}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <ThemeToggle />
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}