import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AnimatedBackground from '../common/AnimatedBackground';

const Layout = ({ children, userRole }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AnimatedBackground />
      <Header toggleSidebar={toggleSidebar} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant={isMobile ? 'temporary' : 'persistent'}
          userRole={userRole}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: isMobile ? 0 : (sidebarOpen ? '240px' : 0),
            width: isMobile ? '100%' : (sidebarOpen ? 'calc(100% - 240px)' : '100%'),
          }}
        >
          <Box sx={{ pt: 8 }}>{children}</Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;